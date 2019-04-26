interface UpdatePayload {
  location?: string;
  male?: string;
  female?: string;
  subLocations?: string[];
}
export const validatePayload = (payload: UpdatePayload) => {
  const { location, male, female, subLocations } = payload;
  if (location && location.trim().length === 0) throw new Error('location cannot be empty');
  if (male && !male.trim().length) throw new Error('male cannot be empty');
  if (female && !female.trim().length) throw new Error('female cannot be empty');
  if (subLocations && !subLocations.length) throw new Error('subLocations cannot be an empty array');
};