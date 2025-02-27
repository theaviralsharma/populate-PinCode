from sqlalchemy import Column, String
from database import Base

class Location(Base):
    __tablename__ = "locations"

    pincode = Column(String, primary_key=True, index=True)
    city = Column(String, index=True)
    state = Column(String, index=True)
    country = Column(String, index=True)