import classes from './Banner.module.css';
import Section from '../../layout/Section';
import { Col } from 'react-bootstrap';
import calendar_noun from '../../assets/social-nouns-3x3.png';
import Noun from '../Noun';
import { Trans } from '@lingui/macro';

const Banner = () => {
  return (
    <Section fullWidth={false} className={classes.bannerSection}>
      <Col lg={6}>
        <div className={classes.wrapper}>
          <h1>
            <Trans>THE FRONT PAGE</Trans>
            <br />
            <Trans>OF</Trans>
            <br />
            <Trans>WEB3 SOCIAL</Trans>
          </h1>
        </div>
      </Col>
      <Col lg={6}>
        <div style={{ padding: '2rem' }}>
          <Noun imgPath={calendar_noun} alt="noun" />
        </div>
      </Col>
    </Section>
  );
};

export default Banner;
