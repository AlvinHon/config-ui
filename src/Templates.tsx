
export type TemplateSelection = "sample" | "systemd.unit";

export const Templates = {
  "sample": `
Unit:
  Description:
    type: string
    required: true
    description: Service description
Service:
  ExecStart:
    type: string
    required: true
    description: Commands that are executed when this service is started.
  Restart:
    type: string
    description: Configures whether the service shall be restarted when the service process exits, is killed, or a timeout is reached.
    options: ["no", "on-success", "on-failure", "on-abnormal", "on-watchdog", "on-abort", "always"]
    default: no
Install:
  WantedBy:
    type: string
    required: true
`,

  // https://manpages.ubuntu.com/manpages/focal/en/man5/systemd.unit.5.html
  // https://manpages.ubuntu.com/manpages/focal/en/man5/systemd.service.5.html
  // 
  "systemd.unit": `
Unit:
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
    default: false
  RefuseManualStart:
    type: boolean
    description: >
          If true, this unit can only be activated
           indirectly. In this case, explicit start-up requested by the user is
           denied, however if it is started as a dependency of another unit, start-up
           or termination will succeed.
    default: false
  RefuseManualStop:
    type: boolean
    description: >
          If true, this unit can only be deactivated
          indirectly. In this case, explicit termination requested by the user is
          denied, however if it is stopped as a dependency of another unit, start-up
          or termination will succeed.
    default: false
  AllowIsolate: 
    type: boolean
    description: >
          If true, this unit may be used with the systemctl isolate
          command. Otherwise, this will be refused. It probably is a good idea to leave this
          disabled except for target units that shall be used similar to runlevels in SysV init
          systems, just as a precaution to avoid unusable system states.
    default: true
  DefaultDependencies:
    type: boolean
    description: >
          If false, removes all dependencies of type Requires= and
          After= from the unit. This option may be used to create a minimal environment for
          the execution of a specific task.
    default: true
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
};
