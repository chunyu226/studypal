from pydantic import BaseModel


class UserProfile(BaseModel):
    id: str
    email: str
    name: str
    avatar_url: str | None = None
    streak_days: int
    level: int

    model_config = {"from_attributes": True}


class AuthResponse(BaseModel):
    access_token: str
    refresh_token: str
    user: UserProfile
