import NewMeetupForm from '../components/meetups/NewMeetupForm';

function NewMeetupPage() {
  function addMeetupHandler(meetupData) {
    fetch('https://react-course-472b5-default-rtdb.firebaseio.com/meetups.json',
      {
        method: 'POST',
        body: JSON.stringify(meetupData),
        headers: {
          'Content-Type': 'application/json'
        }
      }); //firebase 특성. url 뒤에 json 붙임. 두번째 인자는 디폴트가 get이고 명시할 수 있음
  }
  return <div>
    <h1>Add New Meetup</h1>
    <NewMeetupForm onAddMeetup={addMeetupHandler} />
  </div>;
}

export default NewMeetupPage;