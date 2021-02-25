import FirebaseService from "./firebaseService";

const lastTimeUsed = async (id) => {
  const dataRegistry = await FirebaseService.getUniqueDataBy('confirmations', id);
  return dataRegistry?.time;
};

const markUsed = (id) => {
  FirebaseService.updateData(id, 'confirmations', {time: new Date()}).then(
    () => console.log('markUsed: sucess'),
    error => console.log(error)
  );
};

const obj = {
  lastTimeUsed,
  markUsed
};

export default obj;