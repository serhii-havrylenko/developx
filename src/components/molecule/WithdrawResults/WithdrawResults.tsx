import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';

import ChipsWrapper from '#atom/ChipsWrapper';
import ResultWrapper from '#atom/ResultWrapper';

export interface WithdrawResultsProps {
  results: number[];
}
const WithdrawResults: React.SFC<WithdrawResultsProps> = ({ results }) => (
  <div>
    <ResultWrapper>
      <Typography variant="title">Row</Typography>
      <Typography variant="body1">
        [{results.map((note) => note.toFixed(2)).join(', ')}]
      </Typography>
    </ResultWrapper>
    <ResultWrapper>
      <Typography variant="title">Notes:</Typography>
      <ChipsWrapper>
        {results.map((note, id) => (
          <Chip key={id} label={note.toFixed(2)} />
        ))}
      </ChipsWrapper>
    </ResultWrapper>
  </div>
);

export default WithdrawResults;
