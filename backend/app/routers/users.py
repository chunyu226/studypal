from fastapi import APIRouter, Depends
from ..dependencies import get_current_user
from ..models.user import User
from ..schemas.user import UserProfile

router = APIRouter(prefix="/api/users", tags=["users"])


@router.get("/me", response_model=UserProfile)
def get_me(current_user: User = Depends(get_current_user)):
    current_user.level = current_user.streak_days // 7 + 1
    return UserProfile.model_validate(current_user)
