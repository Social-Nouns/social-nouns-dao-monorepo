import { Auction } from '../../wrappers/nounsAuction';
import classes from './AddReferralBtn.module.css';

const AddReferralBtn: React.FC<{
  settleAuctionHandler: () => void;
  auction: Auction;
  revCode?: string;
}> = props => {
  const { settleAuctionHandler, revCode } = props;

  return (
    <p className={classes.emergencySettleWrapper}>
      <button
        onClick={settleAuctionHandler}
        className={classes.emergencySettleButton}
        disabled={revCode != null}
      >
        <span>{revCode != null ? "Referral: Social Noun " + revCode : "Add referral code"}</span>
      </button>
    </p>
  );
};

export default AddReferralBtn;
