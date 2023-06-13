import React from 'react';
import { formatTimestamp } from '../utils/formatTime';
import {
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  TextField,
  Typography,
  Box,
} from '@mui/material';
import { useTracker } from '../hooks/useTracker';

interface TrackerProps {
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

function Tracker({ setRefresh }: TrackerProps) {
  const {
    duration,
    isTrackerRunning,
    tag,
    setTag,
    isTrackerPause,
    startTimer,
    pauseTimer,
    stopTimer,
  } = useTracker(setRefresh);

  return (
    <Card raised={true} sx={{ width: '32em' }}>
      <Box sx={{ m: 2, height: '100%' }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant="h2" component="h2">
              {formatTimestamp(duration)}
            </Typography>
          </Box>
          <Divider variant="middle" />
          <Grid
            container
            alignItems="center"
            justifyContent="space-evenly"
            marginTop="1em"
          >
            <Grid item>
              <TextField
                label="Tag"
                size="small"
                variant="outlined"
                value={tag}
                onChange={(e) => {
                  setTag(e.target.value);
                }}
                error={isTrackerRunning && !tag.length}
              />
            </Grid>
            <Grid item style={{ marginTop: '1rem' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '360px',
                }}
              >
                <Button
                  color="success"
                  disabled={isTrackerRunning && !isTrackerPause}
                  sx={{ width: '8em' }}
                  variant="outlined"
                  onClick={startTimer}
                >
                  {isTrackerPause || isTrackerRunning ? 'Resume' : 'START'}
                </Button>
                <Button
                  color="primary"
                  disabled={isTrackerPause || !isTrackerRunning}
                  sx={{ width: '8em' }}
                  variant="outlined"
                  onClick={pauseTimer}
                >
                  PAUSE
                </Button>
                <Button
                  color="error"
                  variant="outlined"
                  disabled={
                    (isTrackerRunning && !tag.length) ||
                    (!isTrackerRunning && !tag.length) ||
                    !isTrackerRunning
                  }
                  sx={{ width: '8em' }}
                  onClick={stopTimer}
                >
                  STOP
                </Button>
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Box>
    </Card>
  );
}

export default Tracker;
