# CodeRecipe
这个仓库是程谱CodeRecipe网站的代码。简单起见，生成的文件（/docs里面的js文件）和源文件（/src里面的文件）放在一个仓库里。

## Installation
记得clone整个仓库（因为有submodules）：
```
git clone --recurse-submodules
```

后期更新submodules：
```
git submodule update --init
```

## Build
Test build:
```
yarn build
```

Production build:
```
yarn prod
```
