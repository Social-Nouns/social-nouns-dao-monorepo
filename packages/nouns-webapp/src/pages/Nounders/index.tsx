import React from 'react';
import classes from './NoundersPage.module.css';
import Section from '../../layout/Section';
import { Col } from 'react-bootstrap';
import { Trans } from '@lingui/macro';

const NoundersPage = () => {
  return (
    <Section fullWidth={true} className={classes.noundersPage}>
      <Col lg={{ span: 6, offset: 3 }}>
        <h2 style={{ marginBottom: '2rem' }}>
          <Trans>The sNounders</Trans>
        </h2>
        <p style={{ textAlign: 'justify' }}>
          <Trans>
            All Social Noun auction proceeds are sent to the Social Nouns DAO. For this reason, the project's catalyzers
            (‘sNounders’) have chosen to compensate ourselves with Social Nouns. Every 10th Social Noun will be sent to
            our multisig (3/6), where it will be vested and distributed to individual sNounders.
          </Trans>
        </p>
      </Col>
    </Section>
  );
};

export default NoundersPage;
