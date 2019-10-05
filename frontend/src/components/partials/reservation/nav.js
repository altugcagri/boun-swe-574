import React from 'react'

// Partials
import Link from 'components/partials/link'

export default class ReservationNav extends React.Component {
	render() {
		return (
			<nav className="section content-nav">
				<Link className={"nav-item" + (this.props.section === 'sum' ? ' disabled' : '')} navLink href="reservation.info" params={{id: this.props.reservationID}}>
					<i className="item-icon icon-handshake"></i>
					<div className="item-text" disabled={this.props.section === 'sum'}>
						<strong>Rezerve</strong>
						<span>Bilgileri</span>
					</div>
				</Link>
				<Link className={"nav-item" + (this.props.section === 'sum' ? ' disabled' : '')} navLink href="reservation.payment" params={{id: this.props.reservationID}} disabled={this.props.section === 'sum'}>
					<i className="item-icon icon-wallet"></i>
					<div className="item-text">
						<strong>Ödeme</strong>
						<span>Aşaması</span>
					</div>
				</Link>
				<Link className={"nav-item disabled sum"} navLink href="reservation.sum" params={{id: this.props.reservationID}} disabled>
					<i className="item-icon icon-check-round"></i>
					<div className="item-text">
						<strong>Onay</strong>
						<span>Teyidi</span>
					</div>
				</Link>
			</nav>
		)
	}
}

ReservationNav.defaultProps = {
	section: 'info',
	reservationID : false,
}