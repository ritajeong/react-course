import NewMeetupForm from '../components/meetups/NewMeetupForm';

function NewMeetupPage() {
  function addMeetupHandler(meetupData) {
    
  }
  return <div>
    <h1>Add New Meetup</h1>
    <NewMeetupForm onAddMeetup={addMeetupHandler} />
  </div>;
}

export default NewMeetupPage;