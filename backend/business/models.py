from pydantic import BaseModel

class Hours(BaseModel):
    Monday: str
    Tuesday: str
    Wednesday: str
    Thursday: str
    Friday: str
    Saturday: str
    Sunday: str

class Business(BaseModel):
    id: str
    name: str
    address: str
    city: str
    state: str
    latitude: float
    longitude: float
    stars: float
    review_count: int
    is_open: int
    categories: str
    hours: Hours
    description: str
    view_count: int
