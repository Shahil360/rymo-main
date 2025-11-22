from pydantic import BaseModel

class Product(BaseModel):
    name: str
    price: float
    image: str
    review_image: str

class UserSignup(BaseModel):
    name: str
    email: str
    mobile: str
    password: str
    is_admin: int = 0

class UserLogin(BaseModel):
    email: str
    password: str


