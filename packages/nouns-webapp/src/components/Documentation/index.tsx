import Section from '../../layout/Section';
import { Col } from 'react-bootstrap';
import classes from './Documentation.module.css';
import Accordion from 'react-bootstrap/Accordion';
import Link from '../Link';
import { Trans } from '@lingui/macro';

const Documentation = () => {
  const playgroundLink = (
    <Link text={<Trans>Playground</Trans>} url="/playground" leavesPage={false} />
  );
  const publicDomainLink = (
    <Link
      text={<Trans>public domain (CC0)</Trans>}
      url="https://creativecommons.org/publicdomain/zero/1.0/"
      leavesPage={true}
    />
  );
  const compoundGovLink = (
    <Link
      text={<Trans>Compound Governance</Trans>}
      url="https://compound.finance/governance"
      leavesPage={true}
    />
  );
  const twitterlinkmartti = (
    <Link
      text={<Trans>@marttimalmi</Trans>}
      url="https://twitter.com/marttimalmi"
      leavesPage={true}
    />
  );
  const twitterlinksoot2k1 = (
    <Link
      text={<Trans>@oot2k1</Trans>}
      url="https://twitter.com/oot2k1"
      leavesPage={true}
    />
  );
  const twitterlinksocia_noun_5 = (
    <Link
      text={<Trans>@socia_noun_5</Trans>}
      url="https://twitter.com/socia_noun_5"
      leavesPage={true}
    />
  );
  const twitterlinksiAmNeonGhost = (
    <Link
      text={<Trans>@iAmNeonGhost</Trans>}
      url="https://twitter.com/iAmNeonGhost"
      leavesPage={true}
    />
  );
  const twitterlinksPastelBronze = (
    <Link
      text={<Trans>@PastelBronze</Trans>}
      url="https://twitter.com/PastelBronze"
      leavesPage={true}
    />
  );
  const irisLink = (
    <Link
      text={<Trans>Iris</Trans>}
      url="https://www.iris.cx/"
      leavesPage={true}
    />
  );
  const discordLink = (
    <Link
      text={<Trans>Discord</Trans>}
      url="http://discord.gg/4CJc74JEUY"
      leavesPage={true}
    />
  );
  const lensLink = (
    <Link
      text={<Trans>Lens</Trans>}
      url="https://lens.xyz/"
      leavesPage={true}
    />
  );
  const nounsLink = (
    <Link
      text="Nouns"
      url="https://nouns.wtf/"
      leavesPage={true}
    />
  );
  return (
    <Section fullWidth={false}>
      <Col lg={{ span: 10, offset: 1 }}>
        <div className={classes.headerWrapper}>
          <h1>
            <Trans>WTF?</Trans>
          </h1>

          <p className={classes.aboutText}>
            <Trans>
              Inspired by {nounsLink}, Social Nouns are a DAO with a mission to support decentralized and open source social
              protocols.
            </Trans>
          </p>

          <p className={classes.aboutText}>
            <Trans>
              Grab a Social Noun during an auction to get a voice in Social Nouns DAO. All proceeds go 100% to the DAO
              treasury.
            </Trans>
          </p>
          <p className={classes.aboutText} style={{ paddingBottom: '4rem' }}>
            <Trans>
              Learn more below, or start creating Social Nouns off-chain using the {playgroundLink}.
            </Trans>
          </p>
        </div>
        <Accordion flush>
          <Accordion.Item eventKey="0" className={classes.accordionItem}>
            <Accordion.Header className={classes.accordionHeader}>
              <Trans>Summary</Trans>
            </Accordion.Header>
            <Accordion.Body>
              <ul>
                <li>
                  <Trans>Social Nouns artwork is in the {publicDomainLink}.</Trans>
                </li>
                <li>
                  <Trans>One Social Noun is trustlessly auctioned three times per day, forever.</Trans>
                </li>
                <li>
                  <Trans>
                    100% of Social Noun auction proceeds are trustlessly sent to the treasury.
                  </Trans>
                </li>
                <li>
                  <Trans>Settlement of one auction kicks off the next.</Trans>
                </li>
                <li>
                  <Trans>All Social Nouns are members of Social Nouns DAO.</Trans>
                </li>
                <li>
                  <Trans>Social Nouns DAO uses a fork of {compoundGovLink}.</Trans>
                </li>
                <li>
                  <Trans>One Social Noun is equal to one vote.</Trans>
                </li>
                <li>
                  <Trans>
                    The treasury is controlled exclusively by Social Nouns via governance.
                  </Trans>
                </li>
                <li>
                  <Trans>Artwork is generative and stored directly on-chain (not IPFS).</Trans>
                </li>
                <li>
                  <Trans>
                    Social Nouns have chaotic rarity. In other words the community will decide on the
                    parameters for rarity. There are no explicit rules for attribute scarcity; all
                    Social Nouns are equally rare.
                  </Trans>
                </li>
                <li>
                  <Trans>
                    Catalyzers of the DAO (‘sNounders’ from here on) receive rewards in the form of Social Noun NFTs (10% of supply, every tenth Social Noun just like the OG Nouns).
                  </Trans>
                </li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="8" className={classes.accordionItem}>
            <Accordion.Header className={classes.accordionHeader}>
              <Trans>Ecosystem Partners</Trans>
            </Accordion.Header>
            <Accordion.Body>
              <p className={classes.aboutText}>
                <Trans>
                Social Nouns is launching supported by and supporting the following protocols: <br />
                {irisLink} <br />
                {lensLink} <br />
                Any decentralized application, protocol or platform building in Web 3 Social can apply to be on the list
                by contacting us on {discordLink}. DAO makes the decisions which protocols are accepted. Once the
                application is approved, the protocol buys a Social Noun and after that they are listed among others so
                that devs and teams can apply for proposals for that given protocol.
                </Trans>
              </p>
            </Accordion.Body>
          </Accordion.Item>           
          <Accordion.Item eventKey="1" className={classes.accordionItem}>
            <Accordion.Header className={classes.accordionHeader}>
              <Trans>Daily Auctions</Trans>
            </Accordion.Header>
            <Accordion.Body>
              <p className={classes.aboutText}>
                <Trans>
                  The Social Nouns Auction Contract will act as a self-sufficient Social Noun generation and
                  distribution mechanism, auctioning three Social Nouns daily, for a year. 100% of auction proceeds
                  (ETH) are automatically deposited in the Social Nouns DAO treasury, where they are governed by Social
                  Noun owners.
                </Trans>
              </p>

              <p className={classes.aboutText}>
                <Trans>
                  Each time an auction is settled, the settlement transaction will also cause a new
                  Social Noun to be minted and a new 8-hour auction to begin.{' '}
                </Trans>
              </p>
              <p>
                <Trans>
                  While settlement is most heavily incentivized for the winning bidder, it can be
                  triggered by anyone, allowing the system to trustlessly auction Social Nouns as long
                  as Ethereum is operational and there are interested bidders.
                </Trans>
              </p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2" className={classes.accordionItem}>
            <Accordion.Header className={classes.accordionHeader}>
              <Trans>Social Nouns DAO</Trans>
            </Accordion.Header>
            <Accordion.Body>
              <Trans>
                Social Nouns DAO utilizes a fork of {compoundGovLink} and is the main governing body
                of the Social Noun ecosystem. The Social Nouns DAO treasury receives 100% of ETH
                proceeds from Social Noun auctions. Each Social Noun is an irrevocable member
                of Social Nouns DAO and entitled to one vote in all governance matters. Social Noun
                votes are non-transferable (if you sell your Social Noun the vote goes with it) but
                delegatable, which means you can assign your vote to someone else as long as you own
                your Social Noun.
              </Trans>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3" className={classes.accordionItem}>
            <Accordion.Header className={classes.accordionHeader}>
              <Trans>Governance ‘Slow Start’</Trans>
            </Accordion.Header>
            <Accordion.Body>
              <p>
                <Trans>
                  The proposal veto right was initially envisioned as a temporary solution to the
                  problem of ‘51% attacks’ on the Social Nouns DAO treasury. While Catalyzers
                  initially believed that a healthy distribution of Social Noun would be sufficient
                  protection for the DAO, a more complete understanding of the incentives and risks
                  has led to general consensus within the Catalyzers, the Social Noun Foundation,
                  and the wider community that a more robust game-theoretic solution should be
                  implemented before the right is removed.
                </Trans>
              </p>
              <p>
                <Trans>
                Consequently, the sNounders (Social Nouns founders) anticipates being the steward of the veto power until Social Nouns DAO is ready to implement an alternative, and therefore wishes to clarify the conditions under which it would exercise this power.

                </Trans>
              </p>
              <p>
                <Trans>
                The sNounders consider the veto an emergency power that should not be exercised in the normal course of business. The sNounders will veto proposals that introduce non-trivial legal or existential risks to the Social Nouns DAO or the sNounders, including (but not necessarily limited to) proposals that:

                </Trans>
              </p>
              <ul>
                <li>unequally withdraw the treasury for personal gain</li>
                <li>bribe voters to facilitate withdraws of the treasury for personal gain</li>
                <li>
                attempt to alter Social Noun auction cadence for the purpose of maintaining or acquiring a voting majority
                </li>
                <li>make upgrades to critical smart contracts without undergoing an audit</li>
              </ul>
              <p>
                <Trans>
                  There are unfortunately no algorithmic solutions for making these determinations
                  in advance (if there were, the veto would not be required), and proposals must be
                  considered on a case by case basis.
                </Trans>
              </p>
              <p>
                <Trans>
                In the case of Social Nouns, here is a bit more on how the sNounders intend to utilize, and eventually rescind their veto rights.
                We plan on only using the veto on:
                </Trans>
              </p>
              <ul>
                <li>malicious proposals, such as those described above by NounsDAO</li>
                <li>proposals grossly misaligned with the manifesto of Social Nouns DAO</li>
              </ul>
              <p>
                <Trans>
                Social Nouns DAO manages the manifesto, and can thus update its intent.
                </Trans>
              </p>
              <p>
                <Trans>
                Even with a healthy distribution of Social Nouns, this cannot be assured forever, so a 51% attack will always be possible with the current setup of power (Social Nouns) that can be acquired with capital. Our hope is to work with Social Nouns DAO on an acceptable solution amongst the tradeoffs, and when they feel it is safe to rescind our voting power. Thus, we currently plan on rescinding the veto power when a viable alternative emerges to prevent 51% attack as described above by NounsDAO. Due to our intent of supporting public goods, the sNounders veto may remain desired to help ensure mission delivery. Ultimately, the veto should be removed if there is clear signal from Social Nouns DAO that it is no longer needed to ensure mission.
                Furthermore, sNounders is not closed off to new membership. As Social Nouns DAO votes in new community/art pairs, the communities should receive a delegate in sNounders group to help steward governance.
                For transparency, here are the current signers of the sNounders.eth Safe (3/6) (WIP)
                </Trans>
              </p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4" className={classes.accordionItem}>
            <Accordion.Header className={classes.accordionHeader}>
              <Trans>Social Nouns Traits</Trans>
            </Accordion.Header>
            <Accordion.Body>
              <p>
                <Trans>
                  Social Noun are generated randomly based Ethereum block hashes. There are no 'if'
                  statements or other rules governing Social Noun trait scarcity, which makes all
                  of them equally rare. As of this writing, Social Noun are made up of:
                </Trans>
              </p>
              <ul>
                <li>
                <Trans>backgrounds (2) </Trans>
                </li>
                <li>
                <Trans>bodies (30)</Trans>
                </li>
                <li>
                <Trans>accessories (44) </Trans>
                </li>
                <li>
                  <Trans>heads (30) </Trans>
                </li>
                <li>
                  <Trans>headwear (22)</Trans>
                </li>
              </ul>
              
              <Trans>
                You can experiment with off-chain Social Noun generation at the {playgroundLink}.
              </Trans>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="5" className={classes.accordionItem}>
            <Accordion.Header className={classes.accordionHeader}>
              <Trans>On-Chain Artwork</Trans>
            </Accordion.Header>
            <Accordion.Body>
              <p>
                <Trans>
                  Social Noun are stored directly on Ethereum and do not utilize pointers to other
                  networks such as IPFS. This is possible because Social Noun parts are compressed
                  and stored on-chain using a custom run-length encoding (RLE), which is a form of
                  lossless compression.
                </Trans>
              </p>

              <p>
                <Trans>
                  The compressed parts are efficiently converted into a single base64 encoded SVG
                  image on-chain. To accomplish this, each part is decoded into an intermediate
                  format before being converted into a series of SVG rects using batched, on-chain
                  string concatenation. Once the entire SVG has been generated, it is base64
                  encoded.
                </Trans>
              </p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="6" className={classes.accordionItem}>
            <Accordion.Header className={classes.accordionHeader}>
              <Trans> Social Noun Seeder Contract</Trans>
            </Accordion.Header>
            <Accordion.Body>
              <p>
                <Trans>
                  The Social Noun Seeder contract is used to determine Social Noun traits during the
                  minting process. The seeder contract can be replaced to allow for future trait
                  generation algorithm upgrades. Additionally, it can be locked by the Social Noun
                  DAO to prevent any future updates. Currently, Social Noun traits are determined
                  using pseudo-random number generation:
                </Trans>
              </p>
              <code>keccak256(abi.encodePacked(blockhash(block.number - 1), nounId))</code>
              <br />
              <br />
              <p>
                <Trans>
                  Trait generation is not truly random. Traits can be predicted when minting a Noun
                  on the pending block.
                </Trans>
              </p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="7" className={classes.accordionItem}>
            <Accordion.Header className={classes.accordionHeader}>
              <Trans>sNounder's Reward</Trans>
            </Accordion.Header>
            <Accordion.Body>
              <p>
                <Trans>'sNounders' is the group of catalyzers for the Social Nouns DAO. Formed to launch Social Nouns together, and help steward early governance. Here are the sNounders:</Trans>
              </p>
              <ul>
                <li>
                  <Trans>{twitterlinkmartti}</Trans>
                </li>
                <li>
                  <Trans>{twitterlinksoot2k1}</Trans>
                </li>
                <li>
                  <Trans>{twitterlinksocia_noun_5}</Trans>
                </li>
                <li>
                  <Trans>{twitterlinksiAmNeonGhost}</Trans>
                </li>
                <li>
                  <Trans>{twitterlinksPastelBronze}</Trans>
                </li>
              </ul>
              <p>
                <Trans>
                  Because 100% of Social Nouns auction proceeds are sent to Social Nouns DAO treasury, sNounders have chosen to compensate themselves with Social Noun NFTs. Every 10th Social Noun for the first 2 years (183 in total) will be automatically sent to the sNounder's multisig to be vested and shared among the founding members of the project.
                </Trans>
              </p>
              <p>
                <Trans>
                  sNounder distributions don't interfere with the cadence of 8 hour auctions. Social Nouns are sent directly to the sNounder's Multisig, and auctions continue on schedule with the next available Social Noun ID.
                </Trans>
              </p>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Col>
    </Section>
  );
};
export default Documentation;
