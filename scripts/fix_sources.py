import pathlib

def w(path, content):
    pathlib.Path(path).parent.mkdir(porents=True,exist_ok=True)
    pathlib.Path(path).write_text(content,encoding='utf-8')
    print('OK:',path)

print('loaded')
