import { firebaseDatabase } from './firebaseUtils'

export default class FirebaseService {
  static getUniqueDataBy = async (node, id) => {
    const ref = firebaseDatabase.ref(node + '/' + id);
    let newData = {};
    const dataSnapshot = await ref.once('value');
    if (!dataSnapshot || dataSnapshot === undefined || !dataSnapshot.val() || dataSnapshot.val() === undefined) {
      return null;
    }
    const snap = dataSnapshot.val();
    const keys = Object.keys(snap);
    keys.forEach((key) => {
        newData[key] = snap[key]
    });
    return newData;
  };

  static updateData = (id, node, obj) => {
      return firebaseDatabase.ref(node + '/' + id).update({...obj});
  };


}