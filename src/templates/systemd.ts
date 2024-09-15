// https://manpages.ubuntu.com/manpages/focal/en/man5/systemd.unit.5.html
// https://manpages.ubuntu.com/manpages/focal/en/man5/systemd.service.5.html

export const systemdTemplate =
  // [Unit] 
  `Unit:
  Description:
    type: string
    required: true
    description: >
          A human readable name for the unit. This is used by systemd (and other UIs) as the
          label for the unit, so this string should identify the unit rather than describe it,
          despite the name.
  Documentation:
    type: string
    description: >
          A space-separated list of URIs referencing documentation for this unit or its
          configuration. Accepted are only URIs of the types "http://", "https://", "file:",
          "info:", "man:". If the empty string is assigned to this option, the list is reset and all
          prior assignments will have no effect.
  Wants:
    type: string
    description: >
          Configures requirement dependencies on other units. This option may be specified more
          than once or multiple space-separated units may be specified in one option in which
          case dependencies for all listed names will be created.
  Requires:
    type: string
    description: >
          Similar to Wants=, but declares a stronger dependency. Dependencies of this type may
          also be configured by adding a symlink to a .requires/ directory accompanying the unit
          file.
  Requisite:
    type: string
    description: >
          Similar to Requires=. However, if the units listed here are not started already, they
          will not be started and the starting of this unit will fail immediately.  Requisite=
          does not imply an ordering dependency, even if both units are started in the same
          transaction. Hence this setting should usually be combined with After=, to ensure this
          unit is not started before the other unit.
  BindsTo:
    type: string
    description: >
          Configures requirement dependencies, very similar in style to Requires=. However, this
          dependency type is stronger: in addition to the effect of Requires= it declares that
          if the unit bound to is stopped, this unit will be stopped too. This means a unit
          bound to another unit that suddenly enters inactive state will be stopped too.
  PartOf:
    type: string
    description: >
          Configures dependencies similar to Requires=, but limited to stopping and restarting
          of units. When systemd stops or restarts the units listed here, the action is
          propagated to this unit. Note that this is a one-way dependency — changes to this unit
          do not affect the listed units.
  Conflicts:
    type: string
    description: >
          A space-separated list of unit names. Configures negative requirement dependencies. If
          a unit has a Conflicts= setting on another unit, starting the former will stop the
          latter and vice versa.
  Before:
    type: string
    description: >
          A space-separated list of unit names. Configures ordering dependencies between units.
          If a unit foo.service contains a setting Before=bar.service, bar.service's start-up is
          delayed until foo.service is started up. Note that this setting is independent of and
          orthogonal to the requirement dependencies as configured by Requires=, Wants=, BindsTo=,
          and others.
  After:
    type: string
    description: >
          A space-separated list of unit names. Configures ordering dependencies between units.
          If a unit foo.service contains a setting After=bar.service, foo.service's start-up is
          delayed until bar.service is started up. Note that this setting is independent of and
          orthogonal to the requirement dependencies as configured by Requires=, Wants=, BindsTo=,
          and others.
  OnFailure:
    type: string
    description: >
          A space-separated list of one or more units that are activated when this unit enters
          the "failed" state. A service unit using Restart= enters the failed state only after
          the start limits are reached.
  PropagatesReloadTo:
    type: string
    description: >
          A space-separated list of one or more units where reload requests on this unit will be
          propagated to the other unit will be propagated to this unit. 
  ReloadPropagatedFrom:
    type: string
    description: >
          A space-separated list of one or more units where reload requests on the other unit
          will be propagated to this unit. Issuing a reload request on a unit will automatically also enqueue a
          reload request on all units that the reload request shall be propagated to via settings
          PropagatesReloadTo= and ReloadPropagatedFrom=.
  JoinNamespaceOf:
    type: string
    description: >
          For units that start processes (such as service units), lists one or more other units
          whose network and/or temporary file namespace to join.
  RequiresMountsFor:
    type: string
    description: >
          Takes a space-separated list of absolute paths. Automatically adds dependencies of
          type Requires= and After= for all mount units required to access the specified path.
  OnFailureJobMode:
    type: string
    description: >
          Specifies how the units listed in OnFailure= will be enqueued.
    options: ["fail", "replace", "replace-irreversibly", "isolate", "flush", "ignore-dependencies", "ignore-requirements"]
    default: "replace"
  IgnoreOnIsolate:
    type: boolean
    description: >
          If true, the unit will be ignored when isolating 
          the system.
    default: >
          false for service, target, socket, busname, timer, and path units,
          and true for slice, scope, device, swap, mount, and automount units.
  StopWhenUnneeded:
    type: boolean
    description: >
          If true, this unit will be stopped when it is no longer
          used. Note that, in order to minimize the work to be executed, systemd will not stop
          units by default unless they are conflicting with other units, or the user explicitly
          requested their shut down. If this option is set, a unit will be automatically cleaned
          up if no other active unit requires it.
    default: no
  RefuseManualStart:
    type: boolean
    description: >
          If true, this unit can only be activated
           indirectly. In this case, explicit start-up requested by the user is
           denied, however if it is started as a dependency of another unit, start-up
           or termination will succeed.
    default: no
  RefuseManualStop:
    type: boolean
    description: >
          If true, this unit can only be deactivated
          indirectly. In this case, explicit termination requested by the user is
          denied, however if it is stopped as a dependency of another unit, start-up
          or termination will succeed.
    default: no
  AllowIsolate: 
    type: boolean
    description: >
          If true, this unit may be used with the systemctl isolate
          command. Otherwise, this will be refused. It probably is a good idea to leave this
          disabled except for target units that shall be used similar to runlevels in SysV init
          systems, just as a precaution to avoid unusable system states.
    default: yes
  DefaultDependencies:
    type: boolean
    description: >
          If false, removes all dependencies of type Requires= and
          After= from the unit. This option may be used to create a minimal environment for
          the execution of a specific task.
    default: yes
  CollectMode:
    type: string
    description: >
          Tweaks the "garbage collection" algorithm for this unit.
          If set to "inactive", the unit will be garbage collected only if it is not active
          (i.e. not running any processes, timers, or other units) and has no active dependencies.
          If set to "inactive-or-failed", the unit will be garbage collected only if it is not
          active or has failed, and has no active dependencies.
    options: ["inactive", "inactive-or-failed"]
    default: "inactive"
  FailureAction:
    type: string
    description: >
          Configure the action to take when the unit stops and enters a failed state.
    options: ["none", "reboot", "reboot-force", "reboot-immediate", "poweroff", "poweroff-force", "poweroff-immediate", "exit", "exit-force"]
    default: "none"
  SuccessAction:
    type: string
    description: >
          Configure the action to take when the unit stops and enters an inactive state.
    options: ["none", "reboot", "reboot-force", "reboot-immediate", "poweroff", "poweroff-force", "poweroff-immediate", "exit", "exit-force"]
    default: "none"
  JobTimeoutSec:
    type: number
    description: >
          When a job for this unit is queued, a timeout JobTimeoutSec= may be configured.
          If the job has not started within the specified time, it will be automatically
          cancelled. 
  JobRunningTimeoutSec:
    type: number
    description: >
          When a job for this unit is running, a timeout JobRunningTimeoutSec= may be configured.
          If the job has not finished within the specified time, it will be automatically
          cancelled.
  JobTimeoutAction:
    type: string
    description: >
          Configure the action to take when the job timeout is reached.
    options: ["none", "reboot", "reboot-force", "reboot-immediate", "poweroff", "poweroff-force", "poweroff-immediate", "exit", "exit-force"]
    default: "none"
  JobTimeoutRebootArgument:
    type: string
    description: >
          Configure the argument to pass to the reboot command when the job timeout is reached.
  StartLimitIntervalSec:
    type: number
    description: >
          Configures the time to wait before restarting a service after it has terminated.
  StartLimitBurst:
    type: number
    description: >
          Configures the number of times the service can be restarted within the time configured
          by StartLimitIntervalSec=.
    default: "(= DefaultStartLimitIntervalSec in manager configuration)"
  StartLimitAction:
    type: string
    description: >
          Configure an additional action to take if the rate limit configured with
          StartLimitIntervalSec= and StartLimitBurst= is hit.
    options: ["none", "reboot", "reboot-force", "reboot-immediate", "poweroff", "poweroff-force", "poweroff-immediate", "exit", "exit-force"]
    default: "none"
  RebootArgument:
    type: string
    description: >
          Configure the optional argument for the reboot system call if StartLimitAction= or
          FailureAction= is a reboot action. This works just like the optional argument to
          systemctl reboot command.
  SourcePath:
    type: string
    description: >
          A path to a configuration file this unit has been generated from. This is primarily
          useful for implementation of generator tools that convert configuration from an
          external configuration file format into native unit files. This functionality should
          not be used in normal units.
`
  // [Service]
  + `
Service:
  Type:
    type: string
    description: >
          Configures the process start-up type for this service unit. It is generally recommended to use Type=simple for long-running services whenever
          possible, as it is the simplest and fastest option.
    options: ["simple", "exec", "forking", "oneshot", "dbus", "notify", "idle"]
    default: simple if ExecStart= is specified, "oneshot" otherwise
  RemainAfterExit:
    type: boolean
    description: >
          If true, the service shall be considered active even when all its processes have
          terminated.
    default: no
  GuessMainPID:
    type: boolean
    description: >
          If true, systemd will try to guess the main PID of the service if it is not
          explicitly defined.
    default: yes
  PIDFile:
    type: string
    description: >
          Takes a path referring to the PID file of the service.
  BusName:
    type: string
    description: >
          Takes a D-Bus bus name that this service is reachable as. This option is mandatory for
          services where Type= is set to dbus.
  ExecStart:
    type: string
    required: true
    description: >
          Commands with their arguments that are executed when this service is started. 
          The value is split into zero or more command lines.
  ExecStartPre:
    type: string
    description: >
          Additional commands that are executed before the command in ExecStart.
          The value is split into zero or more command lines.
  ExecStartPost:
    type: string
    description: >
          Additional commands that are executed after the command in ExecStart.
          The value is split into zero or more command lines.
  ExecCondition:
    type: string
    description: >
          Optional commands that are executed before the command(s) in ExecStartPre=. Syntax is
          the same as for ExecStart=, except that multiple command lines are allowed and the
          commands are executed one after the other, serially.
  ExecReload:
    type: string
    description: >
          Commands to execute to trigger a configuration reload in the service. This argument
          takes multiple command lines, following the same scheme as described for ExecStart=.
  ExecStop:
    type: string
    description: >
          Commands to execute to stop the service. This argument takes multiple command lines,
          following the same scheme as described for ExecStart=.
  ExecStopPost:
    type: string
    description: >
          Additional commands that are executed after the command in ExecStop.
          The value is split into zero or more command lines.
  RestartSec:
    type: string
    description: >
          Configures the time to sleep before restarting a service (as configured with Restart=).
          Takes a unit-less value in seconds, or a time span value such as "5min
          20s
    default: 100ms
  TimeoutStartSec:
    type: string
    description: >
          Configures the time to wait for start-up. If a daemon service does not signal
          start-up completion within the configured time, the service will be considered failed
          and will be shut down again. Takes a unit-less value in seconds, or a time span value such as
          "5min 20s". Pass "infinity" to disable the timeout logic.
    default: (DefaultTimeoutStartSec in manager configuration, except when Type=oneshot is used)
  TimeoutStopSec:
    type: string
    description: >
          Configures the time to wait for stop. If a service does not terminate within the
          configured time, it will be terminated forcibly via SIGTERM, and after another
          timeout of equal duration with SIGKILL. Takes a unit-less value in seconds, or a time span value such as
          "5min 20s". Pass "infinity" to disable the timeout logic.
    default: (DefaultTimeoutStopSec in manager configuration)
  TimeoutAbortSec:
    type: string
    description: >
          Configures the time to wait for a service stop before the service manager sends a
          SIGKILL signal. Takes a unit-less value in seconds, or a time span value such as
          "5min 20s". Pass "infinity" to disable the timeout logic.
    default: (DefaultTimeoutAbortSec in manager configuration)
  TimeoutSec:
    type: string
    description: >
          A shorthand for configuring both TimeoutStartSec= and TimeoutStopSec= to the specified
          value.
  RuntimeMaxSec:
    type: string
    description: >
          Configures the maximum time that the service is allowed to run. If this is used and
          the service is started. Pass "infinity" (the default) to configure no runtime limit.
    default: infinity
  WatchdogSec:
    type: string
    description: >
          Configures the watchdog timeout for a service. The watchdog is activated when the
          start-up is completed. The service must call sd_notify(3) regularly with the "WATCHDOG=1"
          argument. If the time between two such calls is larger than the configured time, the
          service is placed in a failed state and it will be terminated with a SIGABRT signal.
          The argument is a time in seconds. Defaults to 0, which disables this feature.
    default: 0
  Restart:
    type: string
    description: >
          Configures whether the service shall be restarted when the service process exits, is
          killed, or a timeout is reached.
    options: ["no", "on-success", "on-failure", "on-abnormal", "on-watchdog", "on-abort", "always"]
    default: no
  SuccessExitStatus:
    type: string
    description: >
          Takes a list of exit status definitions that, when returned by the main service process,
          will be considered successful termination, ordered from the least to the highest
          precedence.
  RestartPreventExitStatus:
    type: string
    description: >
          Takes a list of exit status definitions that, when returned by the main service process,
          will prevent automatic service restarts, ordered from the least to the highest
          precedence.
  RestartForceExitStatus:
    type: string
    description: >
          Takes a list of exit status definitions that, when returned by the main service process,
          will force automatic service restarts, ordered from the least to the highest
          precedence.
  RootDirectoryStartOnly:
    type: boolean
    description: >
          If true, the root directory, as configured with the
          RootDirectory= option for more information), is only applied to
          the process started with ExecStart=, and not to the various other ExecStartPre=,
          ExecStartPost=, ExecReload=, ExecStop=, and ExecStopPost= commands. If false, the
          setting is applied to all configured commands the same way. Defaults to false.
    default: no
  NonBlocking:
    type: boolean
    description: >
          Set the O_NONBLOCK flag for all file descriptors passed via socket-based activation.
          If true, all file descriptors >= 3 (i.e. all except stdin, stdout, stderr), excluding
          those passed in via the file descriptor storage logic, will have the O_NONBLOCK flag set and hence are in non-blocking mode. This
          option is only useful in conjunction with a socket unit, and has no effect on file descriptors which were previously saved in
          the file-descriptor store for example.
    default: no
  NotifyAccess:
    type: string
    description: >
          Controls access to the service status notification socket, as accessible via the
          sd_notify(3) call.
    options: ["none", "main", "exec", "all"]
    default: none
  Sockets:
    type: string
    description: >
          Takes a space-separated list of socket unit names. If set, all sockets associated with
          the specified socket unit names are passed to the executed process.
  FileDescriptorStoreMax:
    type: number
    description: >
          Configure how many file descriptors may be stored in the service manager for the
          service using sd_pid_notify_with_fds(3)'s "FDSTORE=1" messages.
    default: 0
  USBFunctionDescriptors:
    type: string
    description: >
          Configure the location of a file containing USB FunctionFS[2] descriptors, for
          implementation of USB gadget functions.
  USBFunctionStrings:
    type: string
    description: >
          Configure the location of a file containing USB FunctionFS strings.
  OOMPolicy:
    type: string
    description: >
          Configure the Out-Of-Memory (OOM) killer policy. On Linux, when memory becomes scarce
          the kernel might decide to kill a running process in order to free up memory and
          reduce memory pressure.
    default: "continue"
` +
  // [Install]
  `
Install:
  Alias:
    type: string
    description: >
          A space-separated list of additional names this unit shall be installed under. The
          names listed here must have the same suffix (i.e. type) as the unit file name.
  WantedBy:
    type: string
    required: true
    description: >
          A space-separated list of unit names. Configures the target that the current unit
          should be installed into when it is enabled.
  RequiredBy:
    type: string
    description: >
          A space-separated list of unit names. Configures the units that are started when the
          current unit is started.
  Also:
    type: string
    description: >
          A space-separated list of additional units to install when this unit is installed.
  DefaultInstance:
    type: string
    description: >
          The default instance name to use when enabling the template unit. This option is
          particularly useful for template units that are instantiated.
`;