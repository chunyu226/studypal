from openai import OpenAI
from ..config import DEEPSEEK_API_KEY, DEEPSEEK_BASE_URL, DEEPSEEK_MODEL
from ..models.user import User

client = OpenAI(api_key=DEEPSEEK_API_KEY, base_url=DEEPSEEK_BASE_URL)


def build_system_prompt(user: User) -> str:
    return (
        f"你是 StudyPal AI 学习助手。请基于以下用户数据提供个性化学习建议：\n"
        f"- 用户名：{user.name}\n"
        f"- 连续打卡天数：{user.streak_days} 天\n"
        f"- 用户等级：Lv.{user.level}\n"
        f"- 注册时间：{user.created_at.strftime('%Y-%m-%d')}\n"
        f"\n"
        f"请用中文回复，风格亲切鼓励。根据用户的学习数据给出具体、可操作的建议。"
        f"如果用户问的问题与学习无关，请友好地引导回学习话题。"
    )


def stream_deepseek(messages: list[dict], user: User):
    system_msg = {"role": "system", "content": build_system_prompt(user)}
    all_messages = [system_msg] + messages

    stream = client.chat.completions.create(
        model=DEEPSEEK_MODEL,
        messages=all_messages,
        temperature=0.7,
        stream=True,
    )

    for chunk in stream:
        if chunk.choices and chunk.choices[0].delta.content:
            yield chunk.choices[0].delta.content
