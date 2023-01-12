import {
  Container,
  Col,
  Image,
  Row,
} from 'react-bootstrap';
import classes from './Partners.module.css';
import React from 'react';
import Iris from '../../assets/iris_template.png';
import Lens from '../../assets/lens_template.png';
import Orbis from '../../assets/orbisclub_template.png';
import Phaver from '../../assets/phaver_banner.png';
import { Trans } from '@lingui/macro';
import Link from "../../components/Link";

const discordLink = (
  <Link
    text={<Trans>Discord</Trans>}
    url="http://discord.gg/4CJc74JEUY"
    leavesPage={true}
  />
);

const Partners: React.FC = () => {
  return (
    <>
      <Container fluid="lg">
        <Row>
          <Col lg={10} className={classes.headerRow}>
            <span>
              <Trans>Explore</Trans>
            </span>
            <h1>
              <Trans>Supported Protocols</Trans>
            </h1>
            <p>
              <Trans>
              Any decentralized application, protocol or platform building in Web 3 Social can apply to be on the list by contacting us on {discordLink}.
              DAO makes the decisions which protocols are accepted. Once the application is approved,
              the protocol buys a Social Noun and after that they are listed among others so that devs and teams can apply for proposals for that given protocol.
              </Trans>
            </p>
          </Col>
        </Row>
        <Row>
          <Col className={classes.headerRow}>
          <h3><Trans>Lens</Trans></h3>
          <a href="https://lens.xyz/" target="_blank" rel="noreferrer">
          <div className={`${classes.imgWrapper}`}><Image src={Lens} alt="noun" className={classes.nounImg} ></Image></div>
          </a>
          </Col>
          <Col className={classes.headerRow}>
          <h3><Trans>Iris</Trans></h3>
          <a href="https://www.iris.cx/" target="_blank" rel="noreferrer">
          <div className={`${classes.imgWrapper}`}><Image src={Iris} alt="noun" className={classes.nounImg} ></Image></div>
          </a>
          </Col>
        </Row>
        <Row>
          <Col className={classes.headerRow}>
          <h3><Trans>Orbis</Trans></h3>
          <a href="https://orbis.club/" target="_blank" rel="noreferrer">
          <div className={`${classes.imgWrapper}`}><Image src={Orbis} alt="noun" className={classes.nounImg} ></Image></div>
          </a>
          </Col>
          <Col className={classes.headerRow}>
          <h3><Trans>Phaver</Trans></h3>
          <a href="https://phaver.com/" target="_blank" rel="noreferrer">
          <div className={`${classes.imgWrapper}`}><Image src={Phaver} alt="noun" className={classes.nounImg} ></Image></div>
          </a>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Partners;
