
export const SetSessionInfo = (AuthInfo) =>({
    type:'SET_SESSION_INFO',
    payload:AuthInfo
});

export const ShowAuctionForm = (AddAuctionFormVisibility)=>({
    type:'SHOW_ADD_AUCTION_FORM',
    payload:AddAuctionFormVisibility
})

