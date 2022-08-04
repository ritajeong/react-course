import { createContext, useState } from 'react';

const FavoritesContext = createContext({
  favorites: [],
  totalFavorites: 0
});

function FavoritesContextProvider(props) {
  const [userFavorites, setUserFavorites] = useState([]);

  function addFavoriteHandler(favoriteMeetup) {
    // setUserFavorites(userFavorites.concat(favoriteMeetup)); //concat은  favorite이 추가된 배열을 새로 반환함
    // 위처럼 쓰면 안되는 이유 :  useState를 사용할 때, 리액트가 state 업데이트를 즉시 처리하지 ㅇ낳고, 작업 예약을 걸어 뒤로 미룬다.
    // 꽤 빠른 시점에 처리되긴 하지만 즉시처리는 아님. 따라서 최신 상태 스냅샷에 따라 업데이트한다고 하면, 상태 스냅샷이 최신상태를 반영하지 못해 상태 업데이트가 불가능한 경우가 생긴다.
    setUserFavorites((prevUserFavorites) => {
      return prevUserFavorites.concat(favoriteMeetup);
     }); //상태 업데이트 함수를 대신 호출할 수 있는 대체 양식을 쓴다. 새 값을 전달하는 대신, 상태 업데이트 함수에 직접 함수를 전달!
  }
  function removeFavoriteHandler(meetupId) {
    setUserFavorites(prevUserFavorites => {
      return prevUserFavorites.filter(meetup => meetup.id !== meetupId);
    })
  }
  
  function itemIsFavoriteHandler(meetupId) {
    return userFavorites.some(meetup => meetup.id === meetupId);
  }


  const context = { //컴포넌트에 전달해야하는 최신값을 보유하고 있음(value context로 전달하는)
    favorites: userFavorites, //context의 초기값에도 정의했기 때문에 Favorites의 키값을 가지고 있음. userFavorites 배열을 state값으로 설정함.
    totalFavorites: userFavorites.length
  };

  return <FavoritesContext.Provider value={context}>
    {props.children}
  </FavoritesContext.Provider>
}

/*
일반적인 리액트 컴포넌트지만
값을 받으려하는 모든 컴포넌트에 context를 제공하는 역할을 함
context 값이 필요한 모든 컴포넌트와 여기 Provider는 context값을 업데이트하는 역할도 함

Provider는 FavoritesContext 객체 안에 있는 빌트인임
해당 context와 상호작용하는 모든 컴포넌트를 포함해야함
Provider 컴포넌트는 나중에 다른 컴포넌트들과 함께 래핑돼어야함.
index.js에서 전체 앱을 래핑하고, 앱의 모든 컴포넌트가 이 context에 액세스할 수 있도록 할것임.

Provider 컴포넌트에 state를 만들기.
Provider가 context 데이터를 관리할 수 있음.
이 컴포넌트는 일반적인 리액트 컴포넌트기 때문에, 
state가 바뀌면 재실행되고 재평가됨.
즉, 컴포넌트에서 context값을 변경하고 이 context값을 provider에게 전달하면, 
해당 context를 받는 모든 componenet가 변경되기 때문에 업데이트된 최신 데이터를 가져올 수 있다.
*/