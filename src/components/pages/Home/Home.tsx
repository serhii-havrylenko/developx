/**
 * Provides root component for '/home' and '/' page
 * @module #pages/Home
 */
import * as React from 'react';
import { connect } from 'react-redux';

import WithdrawInput from '#molecule/WithdrawInput';
import CacheMachine from '#organism/CacheMachine';
import { withdrawAmount } from '#store/actions';

export interface HomeProps {
  onClick: (amount: number) => void;
}

/**
 * Root component for '/home' and '/' page
 */
class Home extends React.Component<HomeProps> {
  public amountRef: React.RefObject<HTMLInputElement>;

  constructor(props: HomeProps) {
    super(props);
    this.amountRef = React.createRef();
  }

  public onWithdrawClick = () => {
    const { onClick } = this.props;
    if (this.amountRef && this.amountRef.current) {
      const amount = Number(this.amountRef.current.value);
      onClick(amount);
    }
  };

  public render() {
    return (
      <div>
        <WithdrawInput
          onWithdrawClick={this.onWithdrawClick}
          amountRef={this.amountRef}
        />
        <CacheMachine />
      </div>
    );
  }
}

export default connect(
  undefined,
  { onClick: withdrawAmount },
)(Home);
