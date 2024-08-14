const initialState = {
   AuthInfo: JSON.parse(localStorage.getItem('AuthInfo')) || {
    UserId:'',
    UserName:'',
    UserEmail:'',
    UserMobile:''
   },
   AddAuctionFormVisibility:false
};

const rootReducer = (state= initialState,action) =>{

    switch (action.type) {
        case 'SET_SESSION_INFO':
            const newState = {
                ...state,
                AuthInfo: action.payload,
              };
              localStorage.setItem('AuthInfo', JSON.stringify(newState.AuthInfo));
              return newState;
        case 'SHOW_ADD_AUCTION_FORM':
            const newStateShow = {
                ...state,
                AddAuctionFormVisibility:action.payload
            }
            return newStateShow;
        default:
          return state;
      }

};

export default rootReducer;