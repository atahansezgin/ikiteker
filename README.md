# İkiteker

Java 11 <br/>
Node v19.4.0 <br/>
React-Native 0.71.0 <br/>

## Ios JSCRuntime Error Solution


This error is due jscruntime moved to react-jsc from react-jsi <br/>


- Development Pods -> RNReanimated -> ios -> native -> NativeProxy.mm <br/>

- update import jsi to <jsc/JSCRuntime.h> <br/>

```
#import <jsc/JSCRuntime.h>
```
