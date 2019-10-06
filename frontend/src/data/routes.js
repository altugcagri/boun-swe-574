module.exports = {
	pages: {
		home: {
			path: "/",
			component: "Home",
			exact: true,
			linkTitle: "Homepage",
			title: "Bespoke | Tailor-Made Content",
			postTitle: false,
			descriptiopn: "",
			meta: {
				keywords: ""
			},
			// Bu şekilde head kısmına custom meta da eklenebilir.
			/*head: [
				{
					key: "meta",
					content: false,
					props: {
						name: "description",
						content: "Minoto, Sıfır Otomobilin Yeni Adresi"
					}
				},
				{
					key: "description",
					content: "Minoto, Sıfır Otomobilin Yeni Adresi",
					props: {}
				}
			],*/
			hideSearchFromHeader: false,
		},
		faq: {
			path: '/faq',
			component: "Faq",
			exact: true,
			linkTitle: "FAQ",
			title: "FAQ",
		},
		explore: {
			path: '/explore',
			component: "Glossary",
			exact: true,
			linkTitle: "Explore",
			title: "Explore",
		},
		notfound: {
			path: false,
			component: "NotFound",
			exact: false,
			linkTitle: "404",
			title: "Sayfa Bulunamadı",
		}
	},
	account: {
		profile: {
			path: "/hesabim/profilim",
			component: "Profile",
			exact: true,
			linkTitle: "Profilim",
			title: "Profilim",
			requiresLogin: true,
		},
		notifications: {
			path: "/hesabim/bildirimler",
			component: "Notifications",
			exact: true,
			linkTitle: "Bildirimler",
			title: "Bildirimler",
			requiresLogin: true,
		},
		favorites: {
			path: "/hesabim/favorilerim/:section?",
			component: "Favorites",
			exact: false,
			linkTitle: "Favorilerim",
			title: "Favorilerim",
			requiresLogin: true,
		},
		messages: {
			path: "/hesabim/mesajlarim",
			component: "Messages",
			exact: true,
			linkTitle: "Mesajlarım",
			title: "Mesajlarım",
			requiresLogin: true,
		},
		messageDetail: {
			path: "/hesabim/mesajlarim/mesaj/:id",
			component: "MessageConversation",
			exact: true,
			linkTitle: "Mesaj Detay",
			title: "Mesaj Detay",
			requiresLogin: true,
		},
		login: {
			path: "/hesabim/giris",
			component: "Login",
			exact: true,
			linkTitle: "Giriş",
			title: "Giriş",
			requiresLogin: false,
		},
		register: {
			path: "/hesabim/uye-ol",
			component: "Register",
			exact: true,
			linkTitle: "Üye Ol",
			title: "Üye Ol",
			requiresLogin: false,
		},
		recovery: {
			path: "/hesabim/sifremi-unuttum/:email?/:token?",
			component: "Recovery",
			exact: true,
			linkTitle: "Şifremi Unuttum",
			title: "Şifre Hatırlatma",
			requiresLogin: false,
		},
		confirmEmail: {
			path: "/hesabim/e-postami-onayla/:email/:token",
			component: "ConfirmEmail",
			exact: true,
			linkTitle: "E-Postamı Onayla",
			title: "E-Postamı Onayla",
			requiresLogin: false,
		}
	}
}