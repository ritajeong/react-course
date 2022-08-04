import { useState, useEffect } from 'react';
import MeetupList from '../components/meetups/MeetupList'

function AllMeetupsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  useEffect(() => {
    setIsLoading(true); 
    fetch(
      'https://react-course-472b5-default-rtdb.firebaseio.com/meetups.json'
    ).then(response => {
      return response.json(); // json 메소드 : response 객체에 포함된 메소드. json에서 일반 plain javascript object로 변환 
    }).then(data => { // 실제 데이터를 얻음. 
      const meetups = [];

      for (const key in data) {
        const meetup = {
          id: key,
          ...data[key]
        }

        meetups.push(meetup);
      }

      setIsLoading(false);
      setLoadedMeetups(meetups);
    });  
  }, []);

  if (isLoading) {
    return <section>
      <p>Loading...</p>
    </section>
  }
  
  return <section>
    <h1>All meetups</h1>
    <MeetupList meetups={loadedMeetups} />
  </section>;
}

export default AllMeetupsPage;

/*
  1. fetch 함수(487 강의)
  fetch가 프로미스를 반환하기 때문에
  우리는 프로미스 체인 내부에 있음
  그러나 자스는 프로미스가 완료될떄까지 기다리지 않음
  async awiat으로 기다리게 하면되지 않아?
  그러면 전체 컴포넌트 함수가 프로미스를 반환하게 됨. 
  그러면 AllMeetupsPage 함수가 프로미스를 반환하는 함수가 되어버림..
  즉, 올바르지 않은 형태..
  why? 리액트 컴포넌트 함수들은 반드시 동기적이어야하며 프로미스를 반환하는게 아니라 JSX를 반환하기 때문.

  응답을 받을때까지 JSX를 반환하는 것을 연기할 순 없음

  따라서 로딩스피너를 임시로 두고,
  응답을 받으면 반환된 JSX 코드를 업데이트한다.

  state를 사용하자
*/

/*
  state : 
  두번째 인자인 상태 업데이트 함수(setIsLoading)를 호출하면, 
  리액트가 이 컴포넌트 함수(function AllMeetups)를 재 실행하고 재평가한다음
  업데이트된 JSX코드를 반환한다.

  즉, state를 사용하면 컴포넌트를 재평가할 수 있으며
  상태가 변경될 때마다 화면에 다른 내용을 렌더링할 수 있음

  그러면.. fetch 함수가 매번 실행됨!!
  => useEffect 사용하기

  useEffect : 특정 조건을 만족하면 일부 코드를 실행하는 훅
*/

/*
  2. useEffect(488강의)

  인자1은 함수, 인자 2는 의존형 배열
  인자2가 추가되면, 리액트는 사용자가 이 배열에 추가한 값을 확인하고 이 effect함수를 마지막으로 실행했을때와 비교함.
  만약 이 배열이 비어있다면 의존성이 없음. 그러면 리액트는 이 컴포넌트 함수가 처음으로 렌더링되고 실행될 때만 이 함수를 실행함.
  이후 실행부터는 이 effect 함수가 실행되지 않음. 의존성이 없기 때문. 의존성의 값이 항상 같을 것이다. 값이 비어있기 때문.
  의존성을 추가한다면? isLoading
  isloading값이 변할 때마다 실행됨.
  isLoading값이 같으면 실행되지 않을 것. 바뀔 때마다 실행된다.

  의존성을 갖는 배열은, effect 함수가 의존하고 있는 모든 외부 값을 추가해야한다.
  fetch는 내부 함수. 컴포넌트 프로퍼티나 상태가 아니기 때문에, fetch 말고는 이 effect 함수에 속하는 상태나 프로퍼티가 없다.
  다만 우리가 이 프로퍼티에서 데이터를 추출하려고 한다면, props.url 처럼 가져오려고 하면 ..의존성에 props 추가하면됨

  setIsLoading, setLoadedMeetups를 의존성으로 추가한다면?
  
  엄밀히 말하자면 외부 의존성을 갖는게 맞음. 하지만 상태 업데이트 함수는 예외.
  그러나 리액트는 상태 업데이트 함수는 절대 안 바뀜을 보장함
  함수는 매번 같은 동작을 실행하기 때문.
  
  
  따라서 의존성 배열은 빈 배열로 둔다.
*/

/*
  3. 부수효과
  화면에 표시되는 것들에 직접적으로 영향을 미치지 않는 코드.
  이러한 부수효과들이 실행되어야할 시점을 제어하는데 적절하다. useEffect
  이제 이 effect 함수의 시작 부분에 있는 isLoading의 값을 treu로 설정함. 
*/