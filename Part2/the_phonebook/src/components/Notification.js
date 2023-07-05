const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className='succsess'>
        {message}
      </div>
    )
  };

  export default Notification