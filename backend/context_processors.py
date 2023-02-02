import glob


def main_css(request):
    css_file = glob.glob('./build/static/css/main.*.css')[0]
    parts = css_file.split('/')
    css_file_unhashed = '/'.join([parts[-2], parts[-1]])
    return {'main_css': css_file_unhashed}


def main_js(request):
    js_file = glob.glob('./build/static/js/main.*.js')[0]
    parts = js_file.split('/')
    js_file_unhashed = '/'.join([parts[-2], parts[-1]])
    return {'main_js': js_file_unhashed}
