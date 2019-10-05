import React from 'react'

// Partials
//import Link from 'components/partials/link'
import Image from 'components/partials/image'
import Responsive from 'components/partials/responsive'
import Btn from 'components/partials/btn'
import { FormInput } from 'components/partials/forms'
import { openModal } from "functions/modals"
import PriceTag from 'components/partials/price-tag'

// Functions

const agreement = "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in dui quis justo dictum pellentesque non vitae elit. In facilisis blandit pharetra. Vestibulum id tellus et magna tempus accumsan. Etiam lobortis velit eget massa cursus, ac dignissim elit euismod. Praesent sollicitudin tincidunt enim ut aliquam. Aenean sit amet tincidunt quam. Vivamus egestas suscipit dictum. Maecenas at dolor vitae ligula aliquam finibus. Cras at porta turpis. Fusce porta enim sed congue convallis. Phasellus arcu justo, maximus ut interdum porta, rutrum quis eros. Suspendisse sollicitudin sed dui quis ultricies. Phasellus nunc urna, lobortis sit amet consectetur at, aliquet vitae ipsum. Mauris ac imperdiet elit. Morbi ac nulla non arcu pellentesque dignissim ac sed ex. Duis vehicula nisi in rhoncus bibendum.</p><h2>Alt Koşullar</h2><p>Aliquam ultrices tellus at augue finibus faucibus. Nam mi lorem, laoreet nec nibh posuere, consectetur lobortis diam. Duis ornare gravida ipsum, a gravida diam iaculis gravida. Donec rutrum quam vitae odio efficitur suscipit. Ut vehicula tristique sapien et pharetra. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eget magna non lectus gravida condimentum in a lacus. Integer interdum placerat ex, ut tempus enim tristique sit amet. Cras ullamcorper aliquam neque rutrum fringilla. Nulla ac ipsum eros. Nulla luctus diam feugiat blandit malesuada.</p><p>Ut id dui nisi. Donec nisl nibh, fringilla et diam quis, scelerisque finibus justo. Pellentesque ut odio pellentesque, pharetra turpis eget, ullamcorper felis. Phasellus euismod ultrices dolor, ut consectetur dui elementum in. In maximus enim in orci vestibulum, eu sollicitudin ante consectetur. Nam vitae vestibulum ipsum. Pellentesque et diam suscipit, dignissim dolor vel, iaculis libero. Duis sagittis, ligula nec rutrum luctus, augue sapien lobortis quam, at fermentum tellus nulla a augue.</p><p>In feugiat ligula ipsum, in scelerisque ipsum ullamcorper in. Fusce dapibus lectus nisi, et maximus augue vestibulum gravida. Etiam eget diam semper, maximus arcu quis, blandit ante. Cras aliquet non mauris nec mattis. Sed a nibh et est auctor aliquet. In nec massa in augue pellentesque molestie non id nunc. Quisque consequat ornare scelerisque. Pellentesque ullamcorper elit eget malesuada consectetur. Vivamus ante ante, posuere et purus eu, aliquet luctus erat. Sed lacinia, orci eu hendrerit placerat, diam mi blandit elit, quis auctor augue elit a lectus. Nam finibus pharetra orci ut varius. Maecenas eget lacus viverra nulla volutpat ultrices. Quisque ut eros lacinia, lobortis dolor vitae, sodales risus. Aliquam mattis sem non massa auctor, ac aliquam tellus accumsan. Mauris feugiat nunc ut auctor blandit. Aenean et magna non quam venenatis pretium vitae eget erat.</p><p>Maecenas nec rhoncus ligula. Aenean quis enim vitae libero hendrerit imperdiet eget id eros. Quisque congue mi est, in dictum velit pellentesque in. Proin mi lectus, vestibulum eget pulvinar id, eleifend nec erat. Nullam dui tellus, ullamcorper ac eleifend quis, posuere a sapien. Sed sagittis interdum sapien eu accumsan. In vulputate sem elit, nec cursus augue tincidunt vel. In rhoncus enim risus, a pretium libero auctor sit amet. Phasellus ornare nunc in interdum condimentum. Vivamus eu interdum quam. Sed egestas mattis porta. Aenean malesuada pellentesque metus sit amet iaculis. Nullam a rhoncus ex, ut finibus dui. Nullam commodo, orci at rhoncus ultricies, velit mi consequat eros, tincidunt feugiat enim sapien eu magna.</p><p>Mauris interdum ac elit et bibendum. Sed vehicula nibh ut dolor scelerisque posuere. Nullam luctus consequat purus, non viverra erat tristique ac. Vestibulum ac nulla vel ipsum tristique maximus. Integer varius ipsum id odio rhoncus, at aliquam lorem volutpat. Donec euismod est eu ipsum condimentum, in tincidunt diam efficitur. Morbi in placerat elit. Morbi est lectus, sagittis volutpat congue ac, lacinia ut risus. Praesent quis pharetra lectus, vitae mollis nisl.</p><p>Vivamus a ligula rutrum, bibendum arcu eu, placerat dolor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent blandit lacus nisi, in tempus tortor elementum rhoncus. Aenean eget dapibus risus. Pellentesque id nunc iaculis tellus malesuada facilisis id posuere nunc. Praesent mollis libero nec eros ornare, sed viverra urna aliquam. In augue quam, vehicula feugiat elit sed, facilisis convallis nisi. Vestibulum ut mauris quis lacus lacinia sodales. Nullam eget elementum lorem. Sed tincidunt, est in venenatis venenatis, sapien ante sollicitudin est, sit amet tincidunt sem metus sed enim. In vitae erat tincidunt, efficitur enim non, rutrum dui. Sed pellentesque odio eu dolor ultricies, vel luctus odio tempus. Vivamus eget velit ut ipsum rutrum sollicitudin vel at nulla. Duis mattis ipsum sem, sodales aliquet ligula lacinia eget."

export default class ReservationNav extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			agreementSelected: false,
		}

		this.agreementChanged = this.agreementChanged.bind(this);
		this.proceed = this.proceed.bind(this);
	}

	agreementChanged(value){
		this.setState({agreementSelected: value});
	}

	proceed() {
		if(this.state.agreementSelected){
			if(this.props.onProceed){
				this.props.onProceed();
			}
		}
	}

	render() {
		if(this.props.reservation){
			let reservation = this.props.reservation;
			return (
				<aside className="section layout-sidebar">
					<div className="sidebar-content">
						<div className="sidebar-advertinfo">
							<div className="advertinfo-imagewrap">
								<Image className="imagewrap-image" src={reservation.product.image} />
								<span className="imagewrap-price"><PriceTag price={reservation.product.price} /></span>
							</div>
							<div className="advertinfo-content">
								<p className="content-id"><strong>İlan No:</strong> {reservation.product.id}</p>
								<p className="content-title">{reservation.product.title}</p>
								<div className="content-info dealer">
									<strong><Responsive type="only-web">Rezerve Edilen </Responsive>Bayi:</strong> <span>{reservation.product.dealer.title}</span>
								</div>
								<div className="content-info price">
									<strong>Rezerve Ücreti:</strong> <span><PriceTag price={reservation.price} /></span>
								</div>
							</div>
						</div>
						{this.props.section === 'info' && 
							<div className="sidebar-controls">
								<Btn tag="link" block uppercase href="reservation.payment" params={{id: reservation.product.id}}>Rezerve Etmek İstiyorum</Btn>
							</div>
						}
						{this.props.section === 'payment' && 
							<div className="sidebar-controls">
								<div className="sidebar-agreement">
									<FormInput type="checkbox" value={this.state.agreementSelected} onChange={this.agreementChanged}><button type="button" className="agreement-link" onClick={() => { openModal('text', {content: agreement, title: "Ön Bilgilendirme Koşulları"})}}>Ön Bilgilendirme Koşulları</button>'nı okudum, onaylıyorum.</FormInput>
									<Btn block uppercase onClick={this.proceed}>Rezerve Etmek İstiyorum</Btn>
								</div>
							</div>
						}
					</div>
				</aside>
			)
		}
		else { return false; }
	}
}

ReservationNav.defaultProps = {
	reservation: false,
	section: "info",
}