﻿using MelonJs.Static.Jint;

namespace MelonJs.Static.Tools.Scripting
{
    public static class EngineWrapper
    {
        public static void ExecuteDirectly(string script)
        {
            JintStatic.CurrentJintEngine?.Execute(script);
        }
    }
}