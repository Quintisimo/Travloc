import React, { useEffect, FC, useState, Component } from 'react'
import axios from 'axios'
import { debounce } from 'debounce'
import { IoIosPin } from 'react-icons/io'
import Header from './Header'
import Loader from './Loader'
import Grid from './Grid'
import Modal from './Modal'
import { Params, Res, Photo } from '../../interface'

type State = {
  params: Partial<Params>
  loading: boolean
  photos: Photo[]
  open: boolean
  photo: Photo | null
  more: boolean
}

class App extends Component<{}, State> {
  public state: State = {
    params: { page: 0 },
    loading: false,
    photos: [],
    open: false,
    photo: null,
    more: true
  }

  async componentDidMount() {
    this.setState({ loading: true })
    try {
      const res = await axios.post<Res>('/api', this.state.params)
      this.setState({
        photos: res.data.photos.photo
      })
    } catch (err) {
      alert(err.message)
    } finally {
      this.setState({ loading: false })
    }
    window.addEventListener('scroll', this.loadMore)
  }

  componentWillUnMount() {
    window.removeEventListener('scroll', this.loadMore)
  }

  async componentDidUpdate(prevProps: {}, prevState: State) {
    if (prevState.params !== this.state.params && this.state.more) {
      this.setState({ loading: true })
      const res = await axios.post<Res>('/api', this.state.params)

      if (res.data.photos.photo) {
        this.setState(prev => ({
          photos: [...prev.photos, ...res.data.photos.photo]
        }))
        this.setState({ loading: false })
      } else {
        this.setState({ more: false })
      }
    }
  }

  private loadMore = debounce(() => {
    if (
      document.documentElement.clientHeight +
        document.documentElement.scrollTop >=
        document.documentElement.scrollHeight &&
      !this.state.loading
    ) {
      const newParams = {
        ...this.state.params,
        page: this.state.params.page + 1
      }
      this.setState({ params: newParams })
    }
  }, 500)

  render() {
    return (
      <React.Fragment>
        <button
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            height: '60px',
            width: '60px',
            borderRadius: '50%',
            fontSize: '30px',
            display: 'flex',
            justifyContent: 'center',
            color: 'red',
            background: 'black',
            border: 'none',
            outline: 'none',
            cursor: 'pointer'
          }}
          title='Get Location'
          onClick={e => {
            const loc = navigator.geolocation
            if (!loc) return alert('Location Not Supported')
            navigator.geolocation.getCurrentPosition(
              ({ coords }) =>
                this.setState({
                  params: {
                    page: 0,
                    lon: coords.longitude,
                    lat: coords.latitude
                  },
                  photos: []
                }),
              ({ message }) => alert(message)
            )
          }}
        >
          <IoIosPin />
        </button>
        <Header />
        {this.state.photos.length > 0 && (
          <Grid
            photos={this.state.photos}
            setOpen={open => this.setState({ open })}
            setPhoto={photo => this.setState({ photo })}
          />
        )}
        {this.state.loading && <Loader />}
        {this.state.photo !== null && (
          <Modal
            open={this.state.open}
            setOpen={open => this.setState({ open })}
            photo={this.state.photo}
          />
        )}
      </React.Fragment>
    )
  }
}

export default App
