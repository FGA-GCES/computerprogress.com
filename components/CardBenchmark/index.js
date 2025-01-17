// import Link from "next/link";
import { useTheme } from "@material-ui/core/styles";
import { useMediaQuery, Button } from "@material-ui/core";
import {
  StyledBox,
  FlexBox,
  FlexItem,
  StyledDivider,
  Link,
  Container,
} from "./style";
import { ArrowRight as ArrowRightIcon } from "react-feather";

export default function CardBenchmark({ taskId, benchmark }) {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Container>
      <Link href={`/tasks/${taskId}/${benchmark.dataset_identifier}`}></Link>
      <StyledBox px={3} py={1}>
        <FlexBox alignItems="center">
          <FlexItem>
            <h3>{benchmark.dataset_name}</h3>
          </FlexItem>
          <FlexItem >
          <Button color="primary" className="button">View all models</Button>
          </FlexItem>
        </FlexBox>
        {isLargeScreen && (
          <>
            <StyledDivider />

            <FlexBox>
              <FlexItem>
                <p>Best model</p>

                <h4>{benchmark.sota_name}</h4>
              </FlexItem>
              <FlexItem pl={2}>
                <p>Paper</p>

                <a target="_blank" href={benchmark.sota_paper_link}>
                  <h4>{benchmark.sota_paper_title}</h4>
                </a>
              </FlexItem>
              <FlexItem pl={2} textAlign="center">
                <p>{benchmark.accuracy_name}</p>

                <h4>{benchmark.sota_accuracy_value}%</h4>
              </FlexItem>
              <FlexItem pl={2} textAlign="right">
                <p>Hardware Burden</p>

                <h4>
                  {benchmark.sota_hardware_burden ? (
                    <>
                      10
                      <sup>
                        {Math.log10(benchmark.sota_hardware_burden).toFixed(1)}
                      </sup>
                    </>
                  ) : (
                    "-"
                  )}
                </h4>
              </FlexItem>
              <FlexItem pl={2} textAlign="right">
                <p>Year</p>

                <h4>{benchmark.sota_paper_publication_date.substring(0, 4)}</h4>
              </FlexItem>
            </FlexBox>
          </>
        )}
      </StyledBox>
    </Container>
  );
}
