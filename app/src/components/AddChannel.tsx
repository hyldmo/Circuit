import * as React from 'react'

const splitChannels = (channels: string) => channels.replace(' ', '').split(',')

export default class AddChannel extends React.Component<{onSubmit: (channels: string[]) => void}, {channels: string}> {
    state = {
        channels: ''
    }

    onChannelChange(value) {
        this.setState({channels: value})
    }

    render() {
        const { onSubmit } = this.props
        const { channels } = this.state
        return (
            <div className='login'>
                <div>
                    <input className='input' type='text' placeholder='Channel name' value={channels}
                        onChange={e => this.onChannelChange(e.currentTarget.value)}
                    />
                </div>
                <div>
                    <button className='input input__btn' onClick={e => onSubmit(splitChannels(channels))}>
                        Add Channel
                    </button>
                </div>
            </div>
        )
    }
}

