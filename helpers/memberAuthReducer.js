const { 
  BECOME_GROUP_LEADER,
  REVOKE_GROUP_LEADER
 } = require('./supportedActionTypes');

const memberAuthReducer = (auth, actionType) => {
  // auth is an array
  switch (actionType) {
    case BECOME_GROUP_LEADER:
      return auth.includes('groupleader') ? auth : [...auth, 'groupleader'];
    case REVOKE_GROUP_LEADER:
      return auth.filter(authLevel => authLevel !== 'groupleader');
    default:
      return auth;
  }
};

module.exports = memberAuthReducer;