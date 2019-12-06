import React from "react";
import { REQUEST_HEADERS } from "../constants";
import axios from "axios";
// Sections
import Header from "components/sections/header";
import Footer from "components/sections/footer";

// Modals
import LoginModal from "components/modals/login";
import RegisterModal from "components/modals/register";
import AnnotationModal from "components/modals/annotation";
import AnnotationWidget from "components/annotation-widget";

// Controllers
import ResponsiveWatcher from "controllers/responsive-watcher";
import ModalsWrap from "controllers/modals-wrap";

// Deps
import { Route, matchPath, Switch, Redirect } from "react-router-dom";
import history from "controllers/history";
import "toasted-notes/src/styles.css";
import { setTitle, setMeta, setHead, setDescription } from "controllers/head";
import routes from "data/routes";
import store from "data/store";
import { setPage, setPageNotFound } from "data/store.generic";
import extend from "lodash/extend";
import { connect } from "react-redux";
import { resolveEndpoint } from "util/Helpers";

// Pages
import Home from "pages/home";
import Glossary from "pages/glossary";
import UserCreatedTopicList from "pages/topic/user-topic-list";
import UserEnrolledTopicList from "pages/topic/user-enrollment-list";
import CreateTopic from "pages/topic/create-topic";
import TopicDetail from "pages/topic/topic";
import EditTopic from "pages/topic/edit-topic";
import TopicPreview from "pages/topic/topic-preview";
import AddContent from "pages/learningpath/add-content";
import EditContent from "pages/learningpath/edit-content";
import ViewContent from "pages/learningpath/view-content";
import ContentQuiz from "pages/learningpath/content-quiz";
import Profile from "pages/profile";
import Faq from "pages/faq";
import NotFound from "pages/notfound";



const pageRegistry = {
    Home: Home,
    NotFound: NotFound,
    Faq: Faq,
    Glossary: Glossary,
    UserCreatedTopicList: UserCreatedTopicList,
    CreateTopic: CreateTopic,
    TopicDetail: TopicDetail,
    EditTopic: EditTopic,
    AddContent: AddContent,
    EditContent: EditContent,
    TopicPreview: TopicPreview,
    UserEnrolledTopicList: UserEnrolledTopicList,
    ViewContent: ViewContent,
    ContentQuiz: ContentQuiz,
    Profile: Profile
};

const mapStateToProps = state => {
    return {
        pageNotFound: state.generic.pageNotFound,
        currentPage: state.generic.currentPage,
        user: state.user.user,
        unreadMessageCount: state.user.unreadMessageCount
    };
};

class Navigator extends React.Component {
    constructor(props) {
        super(props);

        changePage();

        this.state = {
            annotatedText: false,
            cssSelector: false,
            annotations: false,
            annotationsResolved: false,
            focusOffset: false,
            anchorOffset: false,
            isImage: false,
            imgSrc: false,
            currentPageKey: false,
        };

        this.getParents = this.getParents.bind(this);
        this.imageHoverHandler = this.imageHoverHandler.bind(this)
    }

    imageHoverHandler(id, src, title) {
        let vm = this;

        vm.setState({
            annotatedText: title,
            cssSelector: `#${id}`,
            anchorOffset: 0,
            focusOffset: 1,
            isImage: true,
            imgSrc: src
        });

        setTimeout(function () {
            vm.setState({
                annotatedText: false,
                cssSelector: false,
                annotations: false,
                annotationsResolved: false,
                focusOffset: false,
                anchorOffset: false,
                isImage: false,
                imgSrc: false
            });
        }, 5000);
    }

    componentDidMount() {
        window.dynamicHistory = history;
        let vm = this;
        history.listen(function (e) {
            store.dispatch(setPageNotFound(false));
            /*let route = getRouteFromUrl(e.pathname, false, true);
            changePage(route[0], route[1]);*/
        });

        setTimeout(function () {
            changePage(false, "pages", vm.props.user)
            if (vm.props.user) {
                // onselectionchange version
                document.onselectionchange = () => {
                    let selection = document.getSelection();

                    if (selection.focusNode && selection.focusNode.data) {
                        let selectedText = selection.focusNode.data.substring(
                            selection.anchorOffset,
                            selection.focusOffset
                        );

                        let selectedTag = selection.focusNode.parentNode.localName;
                        let classList = selection.focusNode.parentNode.className.split(
                            " "
                        );
                        let classString = "";
                        if (classList.length) {
                            for (let i = 0; i < classList.length; i++) {
                                classString = classString + "." + classList[i];
                            }
                        }
                        if (classString === ".") {
                            classString = "";
                        }


                        let elem = document.querySelector(selectedTag + classString);
                        setTimeout(function () {
                            vm.setState({
                                annotatedText: selectedText,
                                cssSelector: vm.getParents(elem),
                                anchorOffset: selection.anchorOffset,
                                focusOffset: selection.focusOffset
                            });
                        }, 500);
                    } else {
                        setTimeout(function () {
                            vm.setState({ annotatedText: false });
                        }, 300);
                    }
                };
            }
        }, 500)



        setTimeout(function () {
            var images = document.getElementsByTagName("IMG");

            for (let i = 0; i < images.length; i++) {
                images[i].addEventListener("mouseover", () => { vm.imageHoverHandler(images[i].id, images[i].src, images[i].alt) });
            }
        }, 1000)


    }

    getParents(elem) {
        // Set up a parent array
        var parents = [];
        var parentString = "";


        // Push each parent element to the array
        for (; elem && elem !== document; elem = elem.parentNode) {

            parents.push(elem);
        }

        for (let i = 0; i < parents.length; i++) {
            let classList = parents[i].className.split(" ");
            let classString = "";
            if (classList.length) {
                for (let j = 0; j < classList.length; j++) {
                    classString = classString + "." + classList[j];
                }
            }
            if (classString === ".") {
                classString = "";
            }

            parentString =
                parents[i].localName + classString + " > " + parentString;
        }

        parentString = parentString.replace(". >", " >")
        parentString = parentString.replace("..", ".")

        // Return css selector string
        return parentString.substring(0, parentString.length - 2);
    }

    render() {
        let routeData = this.props.pageNotFound ? <NotFound /> : renderRoutes();

        return (
            <div className="site-content bespoke-content">
                <ResponsiveWatcher />
                <Header />
                <div className="router-wrap bespoke-router-wrap">{routeData}</div>
                <Footer />
                <ModalsWrap>
                    <LoginModal />
                    <RegisterModal />
                    <AnnotationModal />
                </ModalsWrap>
                {this.state.annotatedText && (
                    <AnnotationWidget
                        selectedText={this.state.annotatedText}
                        cssSelector={this.state.cssSelector}
                        anchorOffset={this.state.anchorOffset}
                        focusOffset={this.state.focusOffset}
                        isImage={this.state.isImage}
                        imgSrc={this.state.imgSrc}
                    />
                )}
            </div>
        );
    }
}

export default connect(mapStateToProps)(Navigator);

export function ListingLink(params) {
    return (
        "/arama/?" +
        params.map(function (param, nth) {
            return param.key + "=" + param.val;
        })
    );
}

export function redirect(opts, params = false, getParams = false) {
    const defaultOpts = {
        type: "push"
    };

    opts =
        Object.prototype.toString.call(opts) === "[object String]"
            ? extend({}, defaultOpts, { to: opts })
            : extend({}, defaultOpts, opts);

    let route = getRoute(opts.to).path;

    if (params) {
        for (let k = 0; k < Object.keys(params).length; k++) {
            let key = Object.keys(params)[k];
            route = route
                .replace(":" + key + "?", params[key])
                .replace(":" + key, params[key]);
        }
    }

    let getString = "";
    if (getParams) {
        for (let p = 0; p < Object.keys(getParams).length; p++) {
            let key = Object.keys(getParams)[p];

            if (getString !== "") {
                getString += "&";
            }
            getString += key + "=" + encodeURIComponent(getParams[key]);
        }
    }

    if (route) {
        route = route.split("/:")[0];
        if (getString !== "") {
            route = route + "?" + getString;
        }
        switch (opts.type) {
            case "replace":
                history.replace(route);
                break;
            default:
                history.push(route);
                break;
        }
        return true;
    } else {
        return false;
    }
}

export function getRoute(key = false, group = "pages") {
    let routeGroup = group;
    if (key) {
        let keyParts = key.split(".");
        if (keyParts.length === 2) {
            routeGroup = keyParts[0];
            key = keyParts[1];
        }
    }

    let target = routes[routeGroup][key];
    return target ? target : false;
}

export function getRouteFromUrl(
    url = false,
    getObject = false,
    includeCatch = false
) {
    if (url === false) {
        url = window.location.pathname.replace(/\/$/, "");
    }
    let returnRoute = false;
    let returnRouteRaw = false;
    let catchRoute = false;
    Object.keys(routes).forEach((groupKey, index) => {
        let group = routes[groupKey];

        Object.keys(group).forEach((key, index) => {
            let route = routes[groupKey][key];
            if (route.path) {
                if (!returnRoute) {
                    let match = matchPath(url, route.path);
                    if (match && match.isExact) {
                        returnRouteRaw = route;
                        returnRouteRaw.key = key;
                        returnRouteRaw.groupKey = groupKey;
                        if (getObject) {
                            returnRoute = returnRouteRaw;
                        } else {
                            returnRoute = [key, groupKey];
                        }
                    }
                }
            } else if (includeCatch) {
                catchRoute = getObject ? route : [key, groupKey];
            }
        });
    });

    function checkSubRoutes() {
        if (returnRouteRaw && returnRouteRaw.childRoutes) {
            let subRouteRaw = false;
            let subRoute = false;
            let groupKey = returnRouteRaw.childRoutes;
            Object.keys(routes[groupKey]).forEach((key, index) => {
                let route = routes[groupKey][key];
                if (route.path) {
                    if (!subRoute) {
                        let match = matchPath(url, route.path);
                        if (match && match.isExact) {
                            subRouteRaw = route;
                            subRouteRaw.key = key;
                            subRouteRaw.groupKey = groupKey;

                            if (getObject) {
                                subRoute = subRouteRaw;
                            } else {
                                subRoute = [key, groupKey];
                            }
                        }
                    }
                }
            });

            if (subRouteRaw && subRouteRaw.key !== returnRouteRaw.key) {
                returnRoute = subRoute;
                returnRouteRaw = subRouteRaw;

                checkSubRoutes();
            }
        }
    }

    checkSubRoutes();

    return returnRoute ? returnRoute : catchRoute;
}

export function getCurrentRoute(url = false, includeCatch = true) {
    return getRouteFromUrl(false, true, true);
}

export function changeURLParam(
    value,
    param,
    route = false,
    noMismatch = false
) {
    let routeObject = route === false ? getCurrentRoute() : routes[route];
    let data = false;

    if (routeObject) {
        data = routeObject.path
            .replace(":" + param + "?", value)
            .replace(":" + param, value);
        if (noMismatch && data === routeObject.path) {
            data = false;
        }
    }

    return data;
}

export function changePage(key = false, group = "pages", user = false) {
    let route = key ? routes[group][key] : getRouteFromUrl(false, true, true);

    let url = resolveEndpoint("getAnnotations", [
        { slug1: window.location.href }
    ]);
    /* let url = "dummy/annotations.json"; */

    if (user) {
        axios.get(url, REQUEST_HEADERS).then(res => {
            let dummyAnnotation = res.data;


            let sameElements = [];
            for (let i = 0; i < dummyAnnotation.length; i++) {

                setTimeout(function () {
                    if (dummyAnnotation[i].page === window.location.href) {
                        let selector = dummyAnnotation[i].selector.replace(". >", " >")
                        selector = selector.replace("..", ".")


                        var results = [];

                        var toSearch = selector;

                        for (var j = 0; j < sameElements.length; j++) {
                            for (key in sameElements[j]) {
                                if (sameElements[j][key].indexOf(toSearch) !== -1) {
                                    results.push(sameElements[j]);
                                }
                            }
                        }

                        let annotatedText = dummyAnnotation[i].annotatedText;
                        if (selector.charAt(0) === '#') {
                            let image = document.getElementById(selector.replace('#', ''));
                            var newItem = document.createElement("SPAN");       // Create a <li> node
                            newItem.innerHTML = "<mark class='mark-annotation' data-comment='" +
                                dummyAnnotation[i].comment +
                                "'>" +
                                annotatedText +
                                "<span><em>At " +
                                dummyAnnotation[i].date +
                                " " +
                                dummyAnnotation[i].author +
                                " wrote:</em>" +
                                dummyAnnotation[i].comment +
                                "</span></mark>";  // Create a text node
                            // Append the text to <li>


                            if (image) { image.parentNode.insertBefore(newItem, image.nextSibling); }
                        } else {
                            let actualText = document.querySelector(
                                selector
                            );
                            let actualTextInner;

                            if (results.length > 0) {
                                actualTextInner = results[0].html
                            } else {
                                if (actualText) {
                                    actualTextInner = actualText.innerText
                                }
                            }


                            /* let annotatedText = actualText.innerText.substring(
                                dummyAnnotation[i].start,
                                dummyAnnotation[i].end
                            ); */

                            if (actualText) {
                                let newHtml = actualTextInner.replace(
                                    annotatedText,
                                    "<mark class='mark-annotation' data-comment='" +
                                    dummyAnnotation[i].comment +
                                    "'>" +
                                    annotatedText +
                                    "<span><em>At " +
                                    dummyAnnotation[i].date +
                                    " " +
                                    dummyAnnotation[i].author +
                                    " wrote:</em>" +
                                    dummyAnnotation[i].comment +
                                    "</span></mark>"
                                );


                                actualText.innerHTML = newHtml;

                                sameElements.push({ selector: selector, html: actualText.innerHTML })
                            }
                        }


                    }
                }, 1000 + i * 100);
            }


        });
    }

    if (route) {
        if (route.key) {
            key = route.key;
            group = route.groupKey;
        }

        if (key === "notfound") {
            store.dispatch(setPageNotFound(true));
        }

        let pageData = {
            key: key,
            group: group,
            fullKey: group + "." + key,
            data: route
        };

        if (store.getState().generic.currentPage.key !== key) {
            window.scroll(0, 0);
            store.dispatch(setPage(pageData));

            if (window.location.hash) {
                setTimeout(function () {
                    let hashTarget = document.querySelector(
                        window.location.hash
                    );
                    if (hashTarget) {
                        hashTarget.scrollIntoView();
                    }
                }, 500);
            }
        }

        setMeta(route.meta ? route.meta : false, true);
        setHead(route.head ? route.head : false, true);

        setTitle(route.title, route.postTitle);

        if (route.description) {
            setDescription(route.description);
        }

        setHead([
            {
                key: "link",
                props: {
                    rel: "canonical",
                    href: window.location.href
                }
            },
            {
                key: "meta",
                props: {
                    property: "og:url",
                    content: window.location.href
                }
            }
        ]);
    } else {
        console.log("Change page error. Route not found: " + key);
    }
}

export function renderRoutes(opts = {}) {
    const defaultOpts = {
        registry: pageRegistry,
        group: "pages",
        catchRedirect: false
    };
    opts = extend({}, defaultOpts, opts);
    let routeData = Object.keys(routes[opts.group]).map((key, index) => {
        let route = routes[opts.group][key];
        let routeProps = {
            key: index,
            exact: route.exact,
            component: opts.registry[route.component],
            name: route.component
        };

        if (route.path) {
            routeProps.path = route.path;
        }

        return <Route {...routeProps} />;
    });

    if (opts.catchRedirect) {
        let catchOpts = opts.catchRedirect.split(".");
        let to =
            routes[catchOpts.length > 1 ? catchOpts[0] : "pages"][
                catchOpts[catchOpts.length - 1]
            ].path;
        routeData.push(<Redirect to={to} key="redir" />);
    }

    return <Switch>{routeData}</Switch>;
}

export function set404() {
    changePage("notfound");
}
