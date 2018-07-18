import React from 'react'

class Loading extends React.Component{
  render() {
    return (
      <div>
        <div className='skeleton-section '>
          Your content is being Loaded.Please wait....
      </div>
      <div className='full-column'>
      </div>
      </div>
    )
  }
}

export default Loading;
