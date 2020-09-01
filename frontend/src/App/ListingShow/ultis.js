// reviews
export const ratingsType = {
  accuracy_rating: 'Accuracy',
  communication_rating: 'Communication',
  cleanliness_rating: 'Cleanliness',
  location_rating: 'Location',
  checkin_rating: 'Checkin',
  value_rating: 'Value',
};
const getAverageRating = (reviews, subclass) => {
  const sum = [...reviews].reduce((total, review) => total + review.ratings[subclass], 0);
  const average = sum / reviews.length;
  return Math.round(average * 2) / 2;
};

export const getRatingAVG = (reviews) =>
  Object.keys(ratingsType).map((type) => getAverageRating(reviews, type));

export const getTotalRating = (reviews) => {
  const ratingAVG = getRatingAVG(reviews);
  return (
    Math.round(
      (2 * ratingAVG.reduce((total, rating) => total + rating, 0)) / ratingAVG.length
    ) / 2
  );
};

// Amenities

export const SPACES = {
  pool: 'Pool',
  kitchen: 'Kitchen',
  washer: 'Washer',
  dryer: 'Dryer',
  parking: 'Free parking on premises',
  elevator: 'Elevator',
  hot_tub: 'Hot tub',
  gym: 'Gym',
};

export const AMENITIES = {
  essentials: 'Essentials',
  wifi: 'Wifi',
  shampoo: 'Shampoo',
  closet: 'Hangers',
  tv: 'Cable TV',
  heat: 'Heating',
  air_conditioning: 'Air conditioning',
  breakfast: 'Breakfast, coffee, tea',
  desk: 'Laptop friendly workspace',
  fireplace: 'Indoor fireplace',
  iron: 'Iron',
  hair_dryer: 'Hair dryer',
  private_entrance: 'Private entrance',
};

export const SAFE_AMENITIES = {
  smoke_detector: 'Smoke detector',
  carbon_monoxide_detector: 'Carbon monoxide detector',
  first_aid_kit: 'First aid kit',
  fire_extinguisher: 'Fire extinguisher',
};

export const ALL_AMENITIES = { ...SPACES, ...AMENITIES };
