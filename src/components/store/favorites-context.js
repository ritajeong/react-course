import { createContext, useState } from 'react';

const FavoritesContext = createContext({
  favorites: [],
  totalFavorites: 0
});

function FavoritesContextProvider(props) {
  const [userFavorites, setUserFavorites] = useState([]);
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