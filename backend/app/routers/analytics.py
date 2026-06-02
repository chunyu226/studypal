from datetime import datetime, timedelta
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from ..database import get_db
from ..dependencies import get_current_user
from ..models.user import User
from ..models.chat import Conversation, Message

router = APIRouter(prefix="/api/analytics", tags=["analytics"])


@router.get("/overview")
def get_overview(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    # total_hours: 每次 chat conversation 算 0.5h
    conv_count = db.query(func.count(Conversation.id)).filter(
        Conversation.user_id == user.id
    ).scalar() or 0
    total_hours = round(conv_count * 0.5, 1)

    # completed_courses: 从 conversations 数量推导（1 conv ≈ 0.2 course）
    completed_courses = conv_count // 5

    # AI conversation count
    ai_count = conv_count

    # weekly trend (last 7 days of activity)
    weekly_trend = []
    for i in range(6, -1, -1):
        d = datetime.utcnow().date() - timedelta(days=i)
        count = db.query(func.count(Message.id)).filter(
            Message.conversation_id.in_(
                db.query(Conversation.id).filter(Conversation.user_id == user.id)
            ),
            func.date(Message.created_at) == d,
        ).scalar() or 0
        weekly_trend.append({"date": d.strftime("%m/%d"), "value": round(count * 0.1, 1)})

    # monthly trend (last 4 weeks)
    monthly_trend = []
    for i in range(3, -1, -1):
        start = datetime.utcnow().date() - timedelta(weeks=i + 1)
        end = datetime.utcnow().date() - timedelta(weeks=i)
        count = db.query(func.count(Message.id)).filter(
            Message.conversation_id.in_(
                db.query(Conversation.id).filter(Conversation.user_id == user.id)
            ),
            func.date(Message.created_at) >= start,
            func.date(Message.created_at) < end,
        ).scalar() or 0
        monthly_trend.append({"date": f"第{4 - i}周", "value": round(count * 0.1, 1)})

    return {
        "total_hours": total_hours,
        "completed_courses": completed_courses,
        "streak_days": user.streak_days,
        "weekly_trend": weekly_trend,
        "monthly_trend": monthly_trend,
        "ai_conversations": ai_count,
        "morning_sessions": 0,
        "night_sessions": 0,
    }


@router.get("/calendar")
def get_calendar(days: int = 90, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    result = []
    today = datetime.utcnow().date()
    for i in range(days - 1, -1, -1):
        d = today - timedelta(days=i)
        count = db.query(func.count(Message.id)).filter(
            Message.conversation_id.in_(
                db.query(Conversation.id).filter(Conversation.user_id == user.id)
            ),
            func.date(Message.created_at) == d,
        ).scalar() or 0
        result.append({
            "date": d.isoformat(),
            "hours": round(count * 0.1, 1),
            "courses": 1 if count > 0 else 0,
        })
    return {"days": result}


@router.get("/achievements")
def get_achievements(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    conv_count = db.query(func.count(Conversation.id)).filter(
        Conversation.user_id == user.id
    ).scalar() or 0
    total_hours = conv_count * 0.5
    completed_courses = conv_count // 5

    unlocked = {
        "first-study": conv_count > 0,
        "bookworm": completed_courses >= 5,
        "streak-king": user.streak_days >= 30,
        "scholar": total_hours >= 100,
        "fullstack-master": completed_courses >= 20,
        "early-bird": False,
        "night-owl": False,
        "persistence": user.streak_days >= 7,
        "explorer": conv_count >= 50,
        "perfect-week": False,
    }

    progress = {
        "bookworm": f"{completed_courses}/5",
        "streak-king": f"{user.streak_days}/30",
        "scholar": f"{total_hours:.1f}/100",
        "fullstack-master": f"{completed_courses}/20",
        "explorer": f"{conv_count}/50",
        "persistence": f"{user.streak_days}/7",
    }

    from pathlib import Path
    import sys
    frontend_root = Path(__file__).parent.parent.parent.parent / "src"
    # Use hardcoded achievement definitions matching frontend
    achievement_defs = [
        {"id": "first-study", "name": "初入江湖", "icon": "🏆"},
        {"id": "bookworm", "name": "书虫", "icon": "📚"},
        {"id": "streak-king", "name": "打卡王者", "icon": "🔥"},
        {"id": "scholar", "name": "学霸", "icon": "💯"},
        {"id": "fullstack-master", "name": "全栈大师", "icon": "🧠"},
        {"id": "early-bird", "name": "早起鸟", "icon": "🌅"},
        {"id": "night-owl", "name": "夜猫子", "icon": "🌙"},
        {"id": "persistence", "name": "坚持就是胜利", "icon": "💪"},
        {"id": "explorer", "name": "知识探索者", "icon": "🔍"},
        {"id": "perfect-week", "name": "完美一周", "icon": "⭐"},
    ]

    result = []
    for a in achievement_defs:
        is_unlocked = unlocked.get(a["id"], False)
        result.append({
            "id": a["id"],
            "name": a["name"],
            "icon": a["icon"],
            "unlocked": is_unlocked,
            "unlocked_at": user.created_at.isoformat() if is_unlocked else None,
            "progress": progress.get(a["id"]) if not is_unlocked else None,
        })
    return {"achievements": result}
