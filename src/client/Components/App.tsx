import React, { Component } from 'react'
import axios from 'axios'
import { debounce } from 'debounce'
import { IoIosPin, IoIosGlobe } from 'react-icons/io'
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
  error: boolean
}

class App extends Component<{}, State> {
  public state: State = {
    params: { page: 0 },
    loading: false,
    photos: [],
    open: false,
    photo: null,
    more: true,
    error: false
  }

  private imageHeight = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1) + min)

  // Fetch images from the server
  private getImages = async () => {
    this.setState({ error: false, loading: true })
    try {
      const res = await axios.get<Res>('/api', { params: this.state.params })
      if (res.data.photos.photo.length) {
        this.setState(prev => ({
          photos: [
            ...prev.photos,
            ...res.data.photos.photo
              .filter(photo => Boolean(photo.url_l) !== false)
              .map(photo => ({
                ...photo,
                // Generate random number between 2 and 3
                span: Math.floor(Math.random() * (3 - 2 + 1) + 2)
              }))
          ]
        }))
        this.setState({ loading: false })
      } else {
        this.setState({ more: false })
      }
    } catch (err) {
      this.setState({ error: true })
    } finally {
      this.setState({ loading: false })
    }
  }

  // Load more images when the user scrolls to the bottom of the page
  private loadMore = debounce(() => {
    if (
      document.documentElement.clientHeight +
        document.documentElement.scrollTop +
        document.documentElement.scrollTop / 4 >=
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

  componentDidMount() {
    this.getImages()
    window.addEventListener('scroll', this.loadMore)
  }

  componentWillUnMount() {
    window.removeEventListener('scroll', this.loadMore)
  }

  componentDidUpdate(prevProps: {}, prevState: State) {
    if (prevState.params !== this.state.params && this.state.more) {
      this.getImages()
    }
  }

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
            cursor: 'pointer',
            zIndex: 2
          }}
          title={
            this.state.params.lat && this.state.params.lon
              ? 'Get Global Results'
              : 'Get Location Results'
          }
          onClick={e => {
            if (this.state.params.lat && this.state.params.lon) {
              this.setState({ params: { page: 0 }, photos: [] })
            } else {
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
            }
          }}
        >
          {this.state.params.lat && this.state.params.lon ? (
            <IoIosGlobe />
          ) : (
            <IoIosPin />
          )}
        </button>
        <Header />
        {this.state.error ? (
          <div
            style={{
              fontFamily: "'Fira Code', monospace",
              textAlign: 'center'
            }}
          >
            <h1>Error getting Images from Flickr</h1>
            <button
              style={{
                outline: 'none',
                border: 'none',
                background: 'red',
                fontSize: '20px',
                padding: '10px',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
              title='Try Again'
              onClick={this.getImages}
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
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
          </>
        )}
      </React.Fragment>
    )
  }
}

export default App
