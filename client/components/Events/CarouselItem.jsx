import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import EventInfoModal from './EventInfoModal';

const CarouselItem = ({ race }) => (
  <Carousel.Item className="carousel-img">
    <img
      className="d-block w-100"
      src="./images/leeds_runner.jpg"
      alt="First slide"
    />
    <Carousel.Caption>
      <EventInfoModal />
      <div className="carousel-caption">
        <div>
          <h3>{race.name}</h3>
          <div>
            <span>
              Register at: {race.link}
            </span>
          </div>
          <div>{race.description}</div>
        </div>
        <div>
          <div>{race.start_time}</div>
          <div>{race.start_location}</div>
        </div>
      </div>
    </Carousel.Caption>
  </Carousel.Item>
);

export default CarouselItem;
