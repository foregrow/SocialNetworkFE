import store from '../../store'

store.subscribe((mutation)=>{
  switch (mutation.type) {
    case 'setToken':
      if(mutation.payload){
        localStorage.setItem('access_token', mutation.payload);
      }else{
        localStorage.removeItem('access_token');
      }
      break;
  }
})