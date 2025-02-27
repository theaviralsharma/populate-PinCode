from sqlalchemy.orm import Session
from models import Location

def get_location(db: Session, pincode: str):
    return db.query(Location).filter(Location.pincode == pincode).first()

def create_location(db: Session, location_data: dict):
    db_location = Location(**location_data)
    db.add(db_location)
    db.commit()
    db.refresh(db_location)
    return db_location