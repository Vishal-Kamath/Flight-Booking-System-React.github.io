import React, { Component } from 'react';

class AppInstallButton extends Component {
  state = {
    defaultprompt: undefined,
    display: false
  } 

  installAppFunction = async (defaultprompt) => {
    const { outcome } = await defaultprompt.prompt();
    if (outcome === 'accepted') {
      this.setState({display: false});
    }
  }

  beforeinstallprompt = (event) => {
    event.preventDefault();
    this.setState({
      defaultprompt: event,
      display: true
    });
  }
  
  render() {
    window.addEventListener('beforeinstallprompt', (e) => this.beforeinstallprompt(e) );

    const { buttonClass, buttonValue } = this.props;
    return (
      <React.Fragment>
        {
          this.state.display 
          ? <React.Fragment>
              <button 
                className={buttonClass} 
                id='installApp'
                onClick={() => this.installAppFunction(this.state.defaultprompt)} >
                {buttonValue}
              </button>
              <div className="slash"></div>
            </React.Fragment>
          : null
        }
      </React.Fragment>
    );
  }
}
 
export default AppInstallButton;