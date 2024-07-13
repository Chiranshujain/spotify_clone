import React, { useState } from 'react'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import logoimg from '../images/Logo.png'
import profileimg from '../images/profile.JPG'
import { FaSearch } from "react-icons/fa";
import { songsData } from './Assets'
import './AudioPlayer.css'
const audioList = songsData;


function Audioplayer() {
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const [bg, setBg] = useState(audioList[0].accent);
  const [trackName, setTrackName] = useState(audioList[0].name);
  const [trackArtist, setArtist] = useState(audioList[0].artist);
  const [coverImage, setCoverImage] = useState(audioList[0].cover);
  const [searchTerm, setSearchTerm] = useState('');
  

  const filteredAudioList = audioList.filter(audio =>
    audio.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClickNext = () => {
    const newIndex = currentAudioIndex === filteredAudioList.length - 1 ? 0 : currentAudioIndex + 1;
    updatePlayerDetails(newIndex);
  };

  const handleClickPrevious = () => {
    const newIndex = currentAudioIndex === 0 ? filteredAudioList.length - 1 : currentAudioIndex - 1;
    updatePlayerDetails(newIndex);
  };

  const handleSongClick = (index) => {
    setCurrentAudioIndex(index);
    updatePlayerDetails(index);
  };

  const updatePlayerDetails = (index) => {
    setCurrentAudioIndex(index);
    setTrackName(filteredAudioList[index].name);
    setArtist(filteredAudioList[index].artist);
    setBg(filteredAudioList[index].accent);
    setCoverImage(filteredAudioList[index].cover);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    // Reset to first item when search term changes
    if (filteredAudioList.length > 0) {
      updatePlayerDetails(0);
    }
  };

  return (
    <div className='audioPlayer' style={{background: bg}}>
      <div className='sidebar'>
        <div className="logo">
          <img src={logoimg} alt='spotify logo' />
        </div>
        <div className="profile">
          <img src={profileimg} alt='profile' />
        </div>
      </div>
      <div className='audiolist'>
        <div className='listcontainer'>
          <div className='headings'>
            <h2>Top Tracks</h2>
            <h2>For You</h2>
          </div>
          <div className='searchbar'>
            <input type='text' placeholder='Search Song, Artist.....'
              value={searchTerm}
              onChange={handleSearch}
            />
            <i><FaSearch /></i>
          </div>
          <ul className="tracks">
            {filteredAudioList.map((audio, index) => (
              <li key={audio.id} onClick={() => handleSongClick(index)} className='trackcard'>
                <div className='trackprofile'>
                  <img src={audio.cover} alt='trackprofile' />
                </div>
                <div className='trackdetail'>
                  <div className='trackname'>
                    <p>{audio.name}</p>
                  </div>
                  <div className='artist'>
                    <p>{audio.artist}</p>
                  </div>
                </div>
                <div className='trackduration'>
                  <div className='trackduration'>
                    <p>{audio.duration}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='player'>
        <div className='player-content'>
          <div className='songinfo'>
            <h1>{trackName}</h1>
            <p>{trackArtist}</p>
          </div>
          <div className='center'>
            {filteredAudioList.length > 0 && (
              <div className='cover-controler'>
                <img src={coverImage} alt="cover" className="cover-image" />
                <AudioPlayer
                  autoPlay
                  src={filteredAudioList[currentAudioIndex].url}
                  onPlay={() => console.log("Playing")}
                  onClickNext={handleClickNext}
                  onClickPrevious={handleClickPrevious}
                  showSkipControls={true}
                  showJumpControls={false}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Audioplayer