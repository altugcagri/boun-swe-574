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
            hideSearchFromHeader: false
        },
        faq: {
            path: "/faq",
            component: "Faq",
            exact: true,
            linkTitle: "FAQ",
            title: "FAQ"
        },
        explore: {
            path: "/explore",
            component: "Glossary",
            exact: true,
            linkTitle: "Explore",
            title: "Explore"
        },
        userCreatedTopics: {
            path: "/:username/topics/created",
            component: "UserCreatedTopicList",
            exact: true,
            linkTitle: "My Topics",
            title: "My Topics"
        },
        userEnrolledTopics: {
            path: "/:username/topics/enrolled",
            component: "UserEnrolledTopicList",
            exact: true,
            linkTitle: "Topics I Follow",
            title: "Topics I Follow"
        },
        newTopic: {
            path: "/topic/new",
            component: "CreateTopic",
            exact: true,
            linkTitle: "New Topics",
            title: "New Topics"
        },
        topicDetail: {
            path: "/topic/:topicId",
            component: "TopicDetail",
            exact: true,
            linkTitle: "Topics Detail",
            title: "Topics Detail"
        },
        editTopic: {
            path: "/topic/:topicId/edit",
            component: "EditTopic",
            exact: true,
            linkTitle: "Edit Topic",
            title: "Edit Topic"
        },
        previewTopic: {
            path: "/topic/preview/:topicId",
            component: "TopicPreview",
            exact: true,
            linkTitle: "Topic Preview",
            title: "Topic Preview"
        },
        viewTopic: {
            path: "/topic/view/:topicId",
            component: "TopicDetail",
            exact: true,
            linkTitle: "Topic Detail",
            title: "Topic Detail"
        },
        addContent: {
            path: "/topic/:topicId/content",
            component: "AddContent",
            exact: true,
            linkTitle: "Add Content",
            title: "Add Content"
        },
        editContent: {
            path: "/content/:contentId",
            component: "EditContent",
            exact: true,
            linkTitle: "Edit Content",
            title: "Edit Content"
        },
        viewContent: {
            path: "/content/view/:contentId",
            component: "ViewContent",
            exact: true,
            linkTitle: "Content Detail",
            title: "Content Detail"
        },
        contentQuiz: {
            path: "/content/:contentId/quiz",
            component: "ContentQuiz",
            exact: true,
            linkTitle: "Content Quiz",
            title: "Content Quiz"
        },
        profile: {
            path: "/profile/:profile",
            component: "Profile",
            exact: true,
            linkTitle: "Profile",
            title: "Profile"
        },
        notfound: {
            path: false,
            component: "NotFound",
            exact: false,
            linkTitle: "404",
            title: "Sayfa Bulunamadı"
        }
    },
    account: {
        profile: {
            path: "/hesabim/profilim",
            component: "Profile",
            exact: true,
            linkTitle: "Profilim",
            title: "Profilim",
            requiresLogin: true
        },
        notifications: {
            path: "/hesabim/bildirimler",
            component: "Notifications",
            exact: true,
            linkTitle: "Bildirimler",
            title: "Bildirimler",
            requiresLogin: true
        },
        favorites: {
            path: "/hesabim/favorilerim/:section?",
            component: "Favorites",
            exact: false,
            linkTitle: "Favorilerim",
            title: "Favorilerim",
            requiresLogin: true
        },
        messages: {
            path: "/hesabim/mesajlarim",
            component: "Messages",
            exact: true,
            linkTitle: "Mesajlarım",
            title: "Mesajlarım",
            requiresLogin: true
        },
        messageDetail: {
            path: "/hesabim/mesajlarim/mesaj/:id",
            component: "MessageConversation",
            exact: true,
            linkTitle: "Mesaj Detay",
            title: "Mesaj Detay",
            requiresLogin: true
        },
        login: {
            path: "/hesabim/giris",
            component: "Login",
            exact: true,
            linkTitle: "Giriş",
            title: "Giriş",
            requiresLogin: false
        },
        register: {
            path: "/hesabim/uye-ol",
            component: "Register",
            exact: true,
            linkTitle: "Üye Ol",
            title: "Üye Ol",
            requiresLogin: false
        },
        recovery: {
            path: "/hesabim/sifremi-unuttum/:email?/:token?",
            component: "Recovery",
            exact: true,
            linkTitle: "Şifremi Unuttum",
            title: "Şifre Hatırlatma",
            requiresLogin: false
        },
        confirmEmail: {
            path: "/hesabim/e-postami-onayla/:email/:token",
            component: "ConfirmEmail",
            exact: true,
            linkTitle: "E-Postamı Onayla",
            title: "E-Postamı Onayla",
            requiresLogin: false
        }
    }
};
