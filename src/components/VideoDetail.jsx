import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'
import { Typography, Box, Stack } from '@mui/material'
import { CheckCircle } from '@mui/icons-material'
import { Videos } from './'
import { fetchFromAPI } from '../utils/fetchFromAPI'

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null)
  const [videos, setVideos] = useState(null)
  const { id } = useParams()

  useEffect(()=>{
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`)
    .then(data => setVideoDetail(data.items[0]))
    fetchFromAPI(`search?part=snippet&relataedToVideoId=${id}&type=video`)
    .then(data => setVideos(data.items))
  }, [id])

  
  if(!videoDetail?.snippet) return 'Loading...'
  
  const { snippet: { title, channelId, channelTitle, publishedAt, localized: { description } } } = videoDetail;
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  
  console.log(videoDetail)
  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: 'column', md: 'row' }}>
        <Box flex={1}>
          <Box sx={{ width: '100%', position: 'sticky', top: '86px' }}>
            <ReactPlayer
              url={`htpps://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
            />
            <Typography color="#fff" variant="h5" fontWeight="bold" p={2}>
              {title}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ color: '#fff' }}
              py={1}
              px={2}
            >
              <Link to={`/channel/${channelId}`}>
                <Typography
                  variant={{ sm: 'subtitle1', md: 'h6' }}
                  color="#fff"
                >
                  {channelTitle}
                  <CheckCircle
                    sx={{ fontSize: '12px', color: 'gray', ml: '5px' }}
                  />
                </Typography>
              </Link>
            </Stack>
            <Box backgroundColor="#353435" borderRadius="1rem">
              <Stack
                direction="row"
                justify-content="flex-start"
                sx={{ color: '#fff' }}
                py={1}
                px={2}
              >
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="body2" pl={2}>
                  {new Date(publishedAt).toLocaleDateString('en-US', options)}
                </Typography>
              </Stack>
              <Typography variant="body1" sx={{ color: '#fff', pl: 2 }}>
                {description.split('\n').map((line, index) => {
                  return (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  );
                })}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          px={2}
          py={{ xs: 5, md: 1 }}
          justifyContent="center"
          alignItems="center"
        >
          <Videos videos={videos} direction="column" />
        </Box>
      </Stack>
    </Box>
  );
}

export default VideoDetail