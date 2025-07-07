import { AbilityBuilder, createMongoAbility } from '@casl/ability';

export function defineAbilitiesFromSlugs(permissionSlugs = []) {
  const { can, build } = new AbilityBuilder(createMongoAbility);

  permissionSlugs.forEach(slug => {
    const [action, subjectRaw] = slug.split('-');
    const subject = subjectRaw.charAt(0).toUpperCase() + subjectRaw.slice(1);
    can(action, subject);
  });

  return build();
}
