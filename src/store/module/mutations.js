export default {
  setUser(state, user){
    console.log('user => ',user)
    state.user = user
  },
  setPostItem(state, postItem){
    state.postItem = postItem
  },
  setPostsArray(state, postsArray){
    state.postsArray = postsArray
  },
 setUsername(state, username){
    state.username = username;
 }
}
