import Header from './header.vue';
import SvgIcon from './svgIcon.vue';
import Footer from './footer.vue';
import Rate from './rate.vue';
import Empty from './empty.vue';
import Share from './share.vue';
import ValidateCode from './validate-code.vue';

export default {
	install: Vue => {
		Vue.component(Header.name, Header);
		Vue.component(SvgIcon.name, SvgIcon);
		Vue.component(Footer.name, Footer);
		Vue.component(Rate.name, Rate);
		Vue.component(Empty.name, Empty);
		Vue.component(Share.name, Share);
		Vue.component(ValidateCode.name, ValidateCode);
	}
};
