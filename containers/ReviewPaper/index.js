import { useEffect, useState } from 'react';

import { ThemeProvider } from "@material-ui/core/styles";
import { MuiTheme } from "../../styles/theme";
import PrivatePage from "../../components/PrivatePage";

import PageTemplate from "../../components/PageTemplate";

import useApi from '../../services/useApi';
import PaperSubmission from '../../components/PaperSubmission';
import { Box, Grid, Typography } from "@material-ui/core/";

const timeline = [
  {
    type: "remove-author",
    content: "João removed “Gabriel Casado” from authors.",
    date: "2 hours ago",
  },
  {
    type: "add-author",
    content: "João added “Gabriel Casado” to authors.",
    date: "2 hours ago",
  },
  {
    type: "remove",
    content: "João added “Gabriel Casado” to authors.",
    date: "2 hours ago",
  },
  {
    type: "comment",
    content: "João added “Gabriel Casado” to authors.",
    date: "2 hours ago",
  },
  {
    type: "add",
    content:
      "João added “BLEU” accuracy from model “HRNet-OCR (Hierarchical Multi-Scale Attention)”.",
    date: "2 hours ago",
  },
  {
    type: "edit",
    content:
      "João edited dataset from model “HRNet-OCR (Hierarchical Multi-Scale Attention)”.",
    date: "2 hours ago",
  },
];

function ReviewPaper({ submissionId }) {
  const api = useApi();
  const [paper, setPaper] = useState(null);

  const getSubmission = async () => {
    try {
      const res = await api.get(`/submissions/${submissionId}`);
      setPaper(res.data);
    } catch (error) {
      // console.log('cant load this submission')
    }
  }

  useEffect(() => {
    getSubmission();
  }, []);

  return (
    <ThemeProvider theme={MuiTheme}>
      <PageTemplate>
        <Box py={8}>
          <Grid container spacing={5}>
            <PaperSubmission submittedPaper={paper} />
          </Grid>
        </Box>
      </PageTemplate>
    </ThemeProvider>
  );
}

export default PrivatePage(ReviewPaper)